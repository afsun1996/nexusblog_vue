
export interface ToUser {
  user_id: string;
  name: string;
  avatar: string;
  type: number;
}
export interface Params {
  keyword: string;
  pageNum: number;
  pageSize: number;
}

// 登录
export interface LoginParams {
  email: string;
  password: string;
}
export interface UserInfo {
  _id: string;
  name: string;
  avatar: string | any;
}
export interface RegAndLogParams {
  email: string;
  name: string;
  password: string;
  phone: string;
  desc: string;
}


// 导航 nav
export interface NavListItem {
  index: string;
  path: string;
  name: string;
}



// 文章归档
export interface ParamsArchive {
  keyword: string;
  likes: string; // 是否是热门文章
  state: number; // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
  article: number;
  tag_id: string;
  category_id: string;
  pageNum: number;
  pageSize: number;
}
export interface ArchiveListItem {
  create_time: string;
  title: string;
  _id: string;
}
export interface ArchiveList {
  year: string;
  list: ArchiveListItem[];
}
export interface ArchiveData {
  count: number;
  list: ArchiveList | any;
}


// 文章详情
export interface OtherComments {
  content: string;
  create_time: string;
  likes: number;
  state: number;
  to_user: ToUser;
  user: ToUser;
  _id: string;
}
export interface Comments {
  article_id: string;
  content: string;
  create_time: string;
  id: number;
  is_handle: number;
  is_top: boolean;
  likes: number;
  other_comments: OtherComments[];
  state: number;
  update_time: string;
  user: ToUser;
  user_id: string;
  __v: number;
  _id: string;
}

export interface ArticleDetailIF {
  toc:string;
  category: Array<object>;
  comments: Array<Comments>;
  articletags: string[];
  articlecontent:string;
  articletype:string;
  articlecategories:string;
  publishdate:string;
  updatedate:string;
  articletabloid:string;
  likes:number;
  views:number;
  author: string;
  articletitle: string;
  articleid:number
  id: number;
  update_time: string;
  create_time: string;
}
export interface ArticleDetailParams {
  id: string | string[];
  type: number;
}
export interface LikeParams {
  id: number;
  user_id: string;
}

// 文章列表请求
export interface ArticlesParams {
  keyword: string;
  likes: string; // 是否是热门文章
  state: number; // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
  tag_id: string;
  category_id: string;
  pageNum: number;
  pageSize: number;
  orderParam: number;
  orderType: number
}

export interface Lists {
  category: string[];
  articletags: string[];
  articlecontent:string;
  articletype:string;
  articlecategories:string;
  publishdate:string;
  updatedate:string;
  articletabloid:string;
  author: string;
  articletitle: string;
  articleid:number
  id: number;
}
export interface ArticlesData {
  result:Lists | any;
  success: boolean;
  code: string;
  resultDesc: string;
}


// 留言
export interface MessageParams {
  email: string;
  phone: string;
  name: string;
  content: string;
}
export interface RulesItem {
  validator: Function;
  trigger: string;
}
export interface Rules {
  email: RulesItem[];
  phone: RulesItem[];
  name: RulesItem[];
  content: RulesItem[];
}


// 项目
export interface ProjectList {
  content: string;
  end_time: string;
  img: string;
  start_time: string;
  title: string;
  url: string;
  _id: string;
}
export interface ProjectsData {
  count: number;
  list: ProjectList | any;
}


// 历程
export interface TimelineList {
  content: string;
  end_time: string;
  start_time: string;
  title: string;
  state: number;
  _id: string;
}
export interface TimelinesData {
  count: number;
  list: TimelineList | any;
}


// 标签
export interface TagList {
  name: string;
  _id: string;
}
export interface TagsData {
  count: number;
  list: TagList | any;
}
