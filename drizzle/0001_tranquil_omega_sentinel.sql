CREATE TABLE `projects` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`thumbnail` text,
	`sceneData` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
