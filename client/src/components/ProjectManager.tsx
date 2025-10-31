import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Folder, Plus, Trash2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectManagerProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function ProjectManager({ open, onClose, onSelectProject }: ProjectManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const utils = trpc.useUtils();
  const { data: projects, isLoading } = trpc.projects.list.useQuery();
  
  const createProject = trpc.projects.create.useMutation({
    onSuccess: (project) => {
      utils.projects.list.invalidate();
      toast.success("Project created successfully!");
      setShowCreateForm(false);
      setNewProjectName("");
      setNewProjectDescription("");
      onSelectProject(project.id);
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to create project: " + error.message);
    },
  });

  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => {
      utils.projects.list.invalidate();
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete project: " + error.message);
    },
  });

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    createProject.mutate({
      name: newProjectName,
      description: newProjectDescription || undefined,
    });
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject.mutate({ id: projectId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Project Manager</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {showCreateForm ? (
            <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-medium">Create New Project</h3>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Project Name</label>
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Architectural Design"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description (Optional)</label>
                <Textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Describe your project..."
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateProject}
                  disabled={createProject.isPending}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  {createProject.isPending ? "Creating..." : "Create Project"}
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-gray-400">Loading projects...</div>
              ) : projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        onSelectProject(project.id);
                        onClose();
                      }}
                      className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/30 rounded-xl cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                            <Folder className="w-6 h-6 text-teal-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white group-hover:text-teal-400 transition-colors">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              {new Date(project.updatedAt!).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                      {project.description && (
                        <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No projects yet</p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    variant="outline"
                    className="bg-transparent"
                  >
                    Create Your First Project
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

