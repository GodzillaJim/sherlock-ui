export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
};

export type AcademicLevel =
  | 'HIGH_SCHOOL'
  | 'NONE'
  | 'POST_GRADUATE'
  | 'UNDERGRADUATE';

export type AddResponseFeedback = IResponse & {
  __typename?: 'AddResponseFeedback';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  key: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AttachmentInput = {
  key: Scalars['String']['input'];
  location: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  jwtToken?: Maybe<AuthToken>;
  roles?: Maybe<Array<Maybe<Role>>>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiry?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jwtToken?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TokenType>;
};

export type CancelOrderInput = {
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type ClientSecretResponse = IResponse & {
  __typename?: 'ClientSecretResponse';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateOrderResponse = IResponse & {
  __typename?: 'CreateOrderResponse';
  data?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Filter = {
  __typename?: 'Filter';
  limits?: Maybe<Scalars['Float']['output']>;
};

export type FilterOrders = {
  createdAfter?: InputMaybe<Scalars['Date']['input']>;
  createdBefore?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  responseStatus?: InputMaybe<ResponseStatus>;
  status?: InputMaybe<Array<InputMaybe<OrderStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  typeOfWork?: InputMaybe<Type>;
  writingStyle?: InputMaybe<WritingStyle>;
};

export type Firebase = {
  __typename?: 'Firebase';
  identities?: Maybe<Identity>;
  sign_in_provider?: Maybe<Scalars['String']['output']>;
};

export type GetOrderResponse = IResponse & {
  __typename?: 'GetOrderResponse';
  data?: Maybe<OrderResponse>;
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type IResponse = {
  status?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Identity = {
  __typename?: 'Identity';
  email?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  googlecom?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type LoginPayload = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  replyTo?: Maybe<Message>;
  sender: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrderResponse?: Maybe<AddResponseFeedback>;
  cancelOrder?: Maybe<Response>;
  createOrder?: Maybe<Response>;
  createOrderFromTitle?: Maybe<CreateOrderResponse>;
  deleteAttachment?: Maybe<Response>;
  deleteOrder?: Maybe<Response>;
  deleteOrderResponse?: Maybe<Response>;
  deleteOrderResponseAttachment?: Maybe<Response>;
  generatePaymentIntent?: Maybe<ClientSecretResponse>;
  login?: Maybe<AuthResponse>;
  publishOrder?: Maybe<Response>;
  publishResponse?: Maybe<Response>;
  register?: Maybe<AuthResponse>;
  saveOrderDescription?: Maybe<Response>;
  sendOrderMessage?: Maybe<Response>;
  unPublishOrder?: Maybe<Response>;
  unPublishResponse?: Maybe<Response>;
  updateHealth?: Maybe<Scalars['String']['output']>;
  updateOrder?: Maybe<Response>;
  updateOrderResponse?: Maybe<AddResponseFeedback>;
  updatePassword?: Maybe<Response>;
  updatePaymentStatus?: Maybe<ClientSecretResponse>;
  updateUser?: Maybe<Response>;
};


export type MutationAddOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponse?: InputMaybe<OrderResponseInput>;
};


export type MutationCancelOrderArgs = {
  cancelOrderInput: CancelOrderInput;
};


export type MutationCreateOrderArgs = {
  orderInput?: InputMaybe<OrderInput>;
};


export type MutationCreateOrderFromTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAttachmentArgs = {
  attachmentKey?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationDeleteOrderResponseArgs = {
  responseId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteOrderResponseAttachmentArgs = {
  attachmentKey: Scalars['String']['input'];
  responseId: Scalars['String']['input'];
};


export type MutationGeneratePaymentIntentArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};


export type MutationPublishOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationPublishResponseArgs = {
  responseId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterPayload>;
};


export type MutationSaveOrderDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendOrderMessageArgs = {
  input: SendOrderMessageInput;
};


export type MutationUnPublishOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationUnPublishResponseArgs = {
  responseId: Scalars['String']['input'];
};


export type MutationUpdateOrderArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderInput?: InputMaybe<OrderInput>;
};


export type MutationUpdateOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderResponseInput?: InputMaybe<OrderResponseInput>;
  responseId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePasswordArgs = {
  payload?: InputMaybe<PasswordChangePayload>;
};


export type MutationUpdatePaymentStatusArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<UserUpdatePayload>;
};

export type Order = {
  __typename?: 'Order';
  academicLevel?: Maybe<Scalars['String']['output']>;
  attachments: Array<Attachment>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deadline: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discipline?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Message>>;
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

export type OrderInput = {
  academicLevel: AcademicLevel;
  attachments: Array<InputMaybe<AttachmentInput>>;
  deadline: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discipline: Scalars['String']['input'];
  numberOfPages: Scalars['Float']['input'];
  status?: InputMaybe<OrderStatus>;
  title: Scalars['String']['input'];
  type: Type;
  wordsPerPage?: InputMaybe<Scalars['Float']['input']>;
  writingStyle: WritingStyle;
};

export type OrderPage = {
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

export type OrderResponse = {
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

export type OrderResponseInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  comments?: InputMaybe<Scalars['String']['input']>;
  responseType?: InputMaybe<ResponseType>;
};

export type OrderStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'COMPLETED'
  | 'DRAFT'
  | 'IN_PROGRESS';

export type Pagination = {
  currentPage?: InputMaybe<Scalars['Float']['input']>;
  perPage?: InputMaybe<Scalars['Float']['input']>;
};

export type PasswordChangePayload = {
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentStatus =
  | 'CANCELED'
  | 'PAID'
  | 'UN_PAID';

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<PaymentStatus>;
};

export type Query = {
  __typename?: 'Query';
  getClientSecret: Scalars['String']['output'];
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


export type QueryGetClientSecretArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetMyOrdersArgs = {
  filters?: InputMaybe<FilterOrders>;
  pagination: Pagination;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetOrderResponseArgs = {
  responseId: Scalars['String']['input'];
};


export type QueryGetPublicOrdersArgs = {
  filter?: InputMaybe<FilterOrders>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetUserOrdersArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterPayload = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ResponseStatus =
  | 'HAS_NO_RESPONSE'
  | 'HAS_RESPONSE';

export type ResponseType =
  | 'attachment'
  | 'text';

export type Role = {
  __typename?: 'Role';
  name?: Maybe<RoleType>;
};

export type RoleInput = {
  name?: InputMaybe<RoleType>;
};

export type RoleType =
  | 'ADMIN'
  | 'CUSTOMER'
  | 'EDITOR'
  | 'WRITER';

export type SendOrderMessageInput = {
  message: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
  replyTo?: InputMaybe<Scalars['String']['input']>;
};

export type Timezone = {
  __typename?: 'Timezone';
  abbr?: Maybe<Scalars['String']['output']>;
  isdst?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  utc?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  value?: Maybe<Scalars['String']['output']>;
};

export type TimezoneInput = {
  abbr?: InputMaybe<Scalars['String']['input']>;
  isdst?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  utc?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type TokenType =
  | 'BEARER';

export type Type =
  | 'ARTICLE'
  | 'BIBLIOGRAPHY'
  | 'ESSAY'
  | 'PROMPT'
  | 'REVIEW';

export type User = {
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

export type UserUpdatePayload = {
  currency?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  timezone?: InputMaybe<TimezoneInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type WritingStyle =
  | 'APA6'
  | 'APA7'
  | 'HARVARD'
  | 'MLA';
