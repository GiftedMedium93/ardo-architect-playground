import { eq, desc } from "drizzle-orm";
import { projects, type InsertProject, type Project } from "../drizzle/schema";
import { getDb } from "./db";

export async function createProject(project: InsertProject): Promise<Project> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(projects).values(project);
  const result = await db.select().from(projects).where(eq(projects.id, project.id!)).limit(1);
  
  if (result.length === 0) {
    throw new Error("Failed to create project");
  }
  
  return result[0];
}

export async function getProjectsByUser(userId: string): Promise<Project[]> {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.updatedAt));
}

export async function getProject(projectId: string): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateProject(
  projectId: string,
  updates: Partial<Omit<InsertProject, "id" | "userId">>
): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(projects).set(updates).where(eq(projects.id, projectId));
  return await getProject(projectId);
}

export async function deleteProject(projectId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(projects).where(eq(projects.id, projectId));
}

