export type Metadata = {
  link_title: string;
  title: string;
  create_time: Date;
  publish_time_first?: Date;
  publish_time_last?: Date;
  description?: string;
  tags?: string[];
};

export type GeneratedData = {
  description: string;
};

export type Post = {
  id: string;
  metadata: Metadata;
  gendata: GeneratedData;
  content: string;
};
