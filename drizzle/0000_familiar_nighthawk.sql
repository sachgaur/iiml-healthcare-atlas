CREATE TABLE `needs` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`stage` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `needs_created` ON `needs` (`created`);--> statement-breakpoint
CREATE TABLE `votes` (
	`need` text NOT NULL,
	`voter` text NOT NULL,
	PRIMARY KEY(`need`, `voter`),
	FOREIGN KEY (`need`) REFERENCES `needs`(`id`) ON UPDATE no action ON DELETE cascade
);
