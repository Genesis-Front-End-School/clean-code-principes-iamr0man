export namespace ICourse {
	export interface ShortPreview {
		id: string;
		title: string;
		tags: string[],
		launchDate: string,
		status: string;
		description: string;
		duration: number;
		lessonsCount: number;
		containsLockedLessons: boolean;
		previewImageLink: string;
		rating: number;
		meta: Meta
	}

	export interface Meta {
		slug: string;
		skills: string;
		courseVideoPreview: {
			link: string;
			duration: number;
			previewImageLink: string;
		}
	}

	export interface Response {
		courses: ShortPreview[]
	}

	export interface Item {
		id: string;
		title: string;
		tags: string[];
		launchDate: Date;
		status: string;
		description: string;
		duration: number;
		previewImageLink: string;
		rating: number;
		meta: Meta;
		lessons: Lesson[];
		containsLockedLessons: boolean;
	}

	export interface Lesson {
		id: string;
		title: string;
		duration: number;
		order: number;
		type: string;
		status: string;
		link: string;
		previewImageLink: string;
		meta: Meta | null;
	}
}