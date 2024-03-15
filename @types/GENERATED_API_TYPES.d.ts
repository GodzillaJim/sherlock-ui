type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
};

type AcademicLevel =
  | 'HIGH_SCHOOL'
  | 'NONE'
  | 'POST_GRADUATE'
  | 'UNDERGRADUATE';

type AddResponseFeedback = IResponse & {
  __typename?: 'AddResponseFeedback';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type Attachment = {
  __typename?: 'Attachment';
  key?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

type AttachmentInput = {
  key: Scalars['String']['input'];
  location: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

type AuthResponse = {
  __typename?: 'AuthResponse';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  jwtToken?: Maybe<AuthToken>;
  roles?: Maybe<Array<Maybe<Role>>>;
};

type AuthToken = {
  __typename?: 'AuthToken';
  expiry?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jwtToken?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TokenType>;
};

type ClientSecretResponse = IResponse & {
  __typename?: 'ClientSecretResponse';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type CreateOrderResponse = IResponse & {
  __typename?: 'CreateOrderResponse';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type Filter = {
  __typename?: 'Filter';
  limits?: Maybe<Scalars['Float']['output']>;
};

type FilterOrders = {
  createdAfter?: InputMaybe<Scalars['Date']['input']>;
  createdBefore?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  responseStatus?: InputMaybe<ResponseStatus>;
  status?: InputMaybe<Array<InputMaybe<OrderStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  typeOfWork?: InputMaybe<Type>;
  writingStyle?: InputMaybe<WritingStyle>;
};

type Firebase = {
  __typename?: 'Firebase';
  identities?: Maybe<Identity>;
  sign_in_provider?: Maybe<Scalars['String']['output']>;
};

type GetOrderResponse = IResponse & {
  __typename?: 'GetOrderResponse';
  data?: Maybe<OrderResponse>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type IResponse = {
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type Identity = {
  __typename?: 'Identity';
  email?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  googlecom?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

type LoginPayload = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

type Mutation = {
  __typename?: 'Mutation';
  addOrderResponse?: Maybe<AddResponseFeedback>;
  cancelOrder?: Maybe<Response>;
  createOrder?: Maybe<Response>;
  createOrderFromTitle?: Maybe<CreateOrderResponse>;
  deleteAttachment?: Maybe<Response>;
  deleteOrderResponse?: Maybe<Response>;
  deleteOrderResponseAttachment?: Maybe<Response>;
  generatePaymentIntent?: Maybe<ClientSecretResponse>;
  login?: Maybe<AuthResponse>;
  publishOrder?: Maybe<Response>;
  publishResponse?: Maybe<Response>;
  register?: Maybe<AuthResponse>;
  saveOrderDescription?: Maybe<Response>;
  unPublishOrder?: Maybe<Response>;
  unPublishResponse?: Maybe<Response>;
  updateHealth?: Maybe<Scalars['String']['output']>;
  updateOrder?: Maybe<Response>;
  updateOrderResponse?: Maybe<AddResponseFeedback>;
  updatePassword?: Maybe<Response>;
  updatePaymentStatus?: Maybe<ClientSecretResponse>;
  updateUser?: Maybe<Response>;
};


type MutationAddOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponse?: InputMaybe<OrderResponseInput>;
};


type MutationCancelOrderArgs = {
  orderId: Scalars['String']['input'];
};


type MutationCreateOrderArgs = {
  orderInput?: InputMaybe<OrderInput>;
};


type MutationCreateOrderFromTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


type MutationDeleteAttachmentArgs = {
  attachmentKey?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};


type MutationDeleteOrderResponseArgs = {
  responseId?: InputMaybe<Scalars['String']['input']>;
};


type MutationDeleteOrderResponseAttachmentArgs = {
  attachmentKey: Scalars['String']['input'];
  responseId: Scalars['String']['input'];
};


type MutationGeneratePaymentIntentArgs = {
  orderId: Scalars['String']['input'];
};


type MutationLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};


type MutationPublishOrderArgs = {
  orderId: Scalars['String']['input'];
};


type MutationPublishResponseArgs = {
  responseId: Scalars['String']['input'];
};


type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterPayload>;
};


type MutationSaveOrderDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};


type MutationUnPublishOrderArgs = {
  orderId: Scalars['String']['input'];
};


type MutationUnPublishResponseArgs = {
  responseId: Scalars['String']['input'];
};


type MutationUpdateOrderArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderInput?: InputMaybe<OrderInput>;
};


type MutationUpdateOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponseInput?: InputMaybe<OrderResponseInput>;
  responseId?: InputMaybe<Scalars['String']['input']>;
};


type MutationUpdatePasswordArgs = {
  payload?: InputMaybe<PasswordChangePayload>;
};


type MutationUpdatePaymentStatusArgs = {
  orderId: Scalars['String']['input'];
};


type MutationUpdateUserArgs = {
  payload?: InputMaybe<UserUpdatePayload>;
};

type Order = {
  __typename?: 'Order';
  academicLevel?: Maybe<Scalars['String']['output']>;
  attachments: Array<Maybe<Attachment>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deadline: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discipline?: Maybe<Scalars['String']['output']>;
  numberOfPages: Scalars['Float']['output'];
  orderId: Scalars['String']['output'];
  price?: Maybe<Price>;
  published?: Maybe<Scalars['Boolean']['output']>;
  responses: Array<OrderResponse>;
  status: OrderStatus;
  title: Scalars['String']['output'];
  type: Type;
  wordsPerPage?: Maybe<Scalars['Float']['output']>;
  writingStyle: WritingStyle;
};

type OrderInput = {
  academicLevel: AcademicLevel;
  attachments: Array<InputMaybe<AttachmentInput>>;
  deadline: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discipline: Scalars['String']['input'];
  numberOfPages: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  type: Type;
  wordsPerPage?: InputMaybe<Scalars['Float']['input']>;
  writingStyle: WritingStyle;
};

type OrderPage = {
  __typename?: 'OrderPage';
  docs: Array<Order>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  pagingCounter?: Maybe<Scalars['Float']['output']>;
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

type OrderResponse = {
  __typename?: 'OrderResponse';
  answer?: Maybe<Scalars['String']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  comments?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  question: Order;
  responseType: ResponseType;
  updatedAt: Scalars['Date']['output'];
};

type OrderResponseInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  comments?: InputMaybe<Scalars['String']['input']>;
  responseType?: InputMaybe<ResponseType>;
};

type OrderStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'COMPLETED'
  | 'DRAFT'
  | 'IN_PROGRESS';

type Pagination = {
  currentPage?: InputMaybe<Scalars['Float']['input']>;
  perPage?: InputMaybe<Scalars['Float']['input']>;
};

type PasswordChangePayload = {
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
};

type PaymentStatus =
  | 'CANCELED'
  | 'PAID'
  | 'UN_PAID';

type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<PaymentStatus>;
};

type Query = {
  __typename?: 'Query';
  getMyOrders?: Maybe<OrderPage>;
  getMyResponses?: Maybe<Array<Maybe<OrderResponse>>>;
  getOrder?: Maybe<Order>;
  getOrderResponse?: Maybe<GetOrderResponse>;
  getPublicOrders?: Maybe<OrderPage>;
  getResponsesToQuestionsByUser?: Maybe<Array<Maybe<OrderResponse>>>;
  getUserOrders?: Maybe<Array<Maybe<Order>>>;
  health?: Maybe<Scalars['String']['output']>;
  me?: Maybe<User>;
};


type QueryGetMyOrdersArgs = {
  filters?: InputMaybe<FilterOrders>;
  pagination: Pagination;
};


type QueryGetOrderArgs = {
  orderId: Scalars['String']['input'];
};


type QueryGetOrderResponseArgs = {
  responseId: Scalars['String']['input'];
};


type QueryGetPublicOrdersArgs = {
  filter?: InputMaybe<FilterOrders>;
  pagination?: InputMaybe<Pagination>;
};


type QueryGetUserOrdersArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

type RegisterPayload = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

type ResponseStatus =
  | 'HAS_NO_RESPONSE'
  | 'HAS_RESPONSE';

type ResponseType =
  | 'attachment'
  | 'text';

type Role = {
  __typename?: 'Role';
  name?: Maybe<RoleType>;
};

type RoleInput = {
  name?: InputMaybe<RoleType>;
};

type RoleType =
  | 'ADMIN'
  | 'CUSTOMER'
  | 'EDITOR'
  | 'WRITER';

type Timezone = {
  __typename?: 'Timezone';
  abbr?: Maybe<Scalars['String']['output']>;
  isdst?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  utc?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  value?: Maybe<Scalars['String']['output']>;
};

type TimezoneInput = {
  abbr?: InputMaybe<Scalars['String']['input']>;
  isdst?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  utc?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['String']['input']>;
};

type TokenType =
  | 'BEARER';

type Type =
  | 'ARTICLE'
  | 'BIBLIOGRAPHY'
  | 'ESSAY'
  | 'PROMPT'
  | 'REVIEW';

type User = {
  __typename?: 'User';
  aud?: Maybe<Scalars['String']['output']>;
  auth_time?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  email_verified?: Maybe<Scalars['Boolean']['output']>;
  exp?: Maybe<Scalars['Float']['output']>;
  firebase?: Maybe<Firebase>;
  firstName?: Maybe<Scalars['String']['output']>;
  iat?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  iss?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  password?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  responses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  sub?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Timezone>;
  uid?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

type UserUpdatePayload = {
  currency?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  timezone?: InputMaybe<TimezoneInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

type WritingStyle =
  | 'APA6'
  | 'APA7'
  | 'HARVARD'
  | 'MLA';
