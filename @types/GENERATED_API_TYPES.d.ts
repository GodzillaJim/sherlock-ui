type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  JSON: { [key: string]: any };
  ObjectId: any;
};

type AddResponseFeedback = IResponse & {
  __typename?: 'AddResponseFeedback';
  data?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
  success?: Maybe<Scalars['Boolean']>;
};

type Attachment = {
  __typename?: 'Attachment';
  key?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type AttachmentInput = {
  key: Scalars['String'];
  location: Scalars['String'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
};

type AuthResponse = {
  __typename?: 'AuthResponse';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<AuthToken>;
  roles?: Maybe<Array<Maybe<Role>>>;
};

type AuthToken = {
  __typename?: 'AuthToken';
  expiry?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jwtToken?: Maybe<Scalars['String']>;
  type?: Maybe<TokenType>;
};

type ClientSecretResponse = IResponse & {
  __typename?: 'ClientSecretResponse';
  data?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
  success?: Maybe<Scalars['Boolean']>;
};

type CreateOrderResponse = IResponse & {
  __typename?: 'CreateOrderResponse';
  data?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
  success?: Maybe<Scalars['Boolean']>;
};

type Filter = {
  __typename?: 'Filter';
  limits?: Maybe<Scalars['Float']>;
};

type FilterOrders = {
  createdAfter?: InputMaybe<Scalars['Date']>;
  createdBefore?: InputMaybe<Scalars['Date']>;
  limit?: InputMaybe<Scalars['Float']>;
  responseStatus?: InputMaybe<ResponseStatus>;
  title?: InputMaybe<Scalars['String']>;
  typeOfWork?: InputMaybe<Type>;
  writingStyle?: InputMaybe<WritingStyle>;
};

type Firebase = {
  __typename?: 'Firebase';
  identities?: Maybe<Identity>;
  sign_in_provider?: Maybe<Scalars['String']>;
};

type GetOrderResponse = IResponse & {
  __typename?: 'GetOrderResponse';
  data?: Maybe<OrderResponse>;
  status?: Maybe<Scalars['Float']>;
  success?: Maybe<Scalars['Boolean']>;
};

type IResponse = {
  status?: Maybe<Scalars['Float']>;
  success?: Maybe<Scalars['Boolean']>;
};

type Identity = {
  __typename?: 'Identity';
  email?: Maybe<Array<Maybe<Scalars['String']>>>;
  googlecom?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type LoginPayload = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  addOrderResponse?: Maybe<AddResponseFeedback>;
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
  updateHealth?: Maybe<Scalars['String']>;
  updateOrder?: Maybe<Response>;
  updateOrderResponse?: Maybe<AddResponseFeedback>;
  updatePassword?: Maybe<Response>;
  updatePaymentStatus?: Maybe<ClientSecretResponse>;
  updateUser?: Maybe<Response>;
};


type MutationAddOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']>;
  orderResponse?: InputMaybe<OrderResponseInput>;
};


type MutationCreateOrderArgs = {
  orderInput?: InputMaybe<OrderInput>;
};


type MutationCreateOrderFromTitleArgs = {
  title?: InputMaybe<Scalars['String']>;
};


type MutationDeleteAttachmentArgs = {
  attachmentKey?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
};


type MutationDeleteOrderResponseArgs = {
  responseId?: InputMaybe<Scalars['String']>;
};


type MutationDeleteOrderResponseAttachmentArgs = {
  attachmentKey: Scalars['String'];
  responseId: Scalars['String'];
};


type MutationGeneratePaymentIntentArgs = {
  orderId: Scalars['String'];
};


type MutationLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};


type MutationPublishOrderArgs = {
  orderId: Scalars['String'];
};


type MutationPublishResponseArgs = {
  responseId: Scalars['String'];
};


type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterPayload>;
};


type MutationSaveOrderDescriptionArgs = {
  description?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
};


type MutationUnPublishOrderArgs = {
  orderId: Scalars['String'];
};


type MutationUnPublishResponseArgs = {
  responseId: Scalars['String'];
};


type MutationUpdateOrderArgs = {
  orderId?: InputMaybe<Scalars['String']>;
  orderInput?: InputMaybe<OrderInput>;
};


type MutationUpdateOrderResponseArgs = {
  orderId?: InputMaybe<Scalars['String']>;
  orderResponseInput?: InputMaybe<OrderResponseInput>;
  responseId?: InputMaybe<Scalars['String']>;
};


type MutationUpdatePasswordArgs = {
  payload?: InputMaybe<PasswordChangePayload>;
};


type MutationUpdatePaymentStatusArgs = {
  orderId: Scalars['String'];
};


type MutationUpdateUserArgs = {
  payload?: InputMaybe<UserUpdatePayload>;
};

type Order = {
  __typename?: 'Order';
  attachments: Array<Maybe<Attachment>>;
  createdAt?: Maybe<Scalars['Date']>;
  deadline: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  numberOfPages: Scalars['Float'];
  orderId: Scalars['String'];
  price?: Maybe<Price>;
  published?: Maybe<Scalars['Boolean']>;
  responses?: Maybe<Array<Maybe<OrderResponse>>>;
  title: Scalars['String'];
  type: Type;
  wordsPerPage?: Maybe<Scalars['Float']>;
  writingStyle: WritingStyle;
};

type OrderInput = {
  attachments: Array<InputMaybe<AttachmentInput>>;
  deadline: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  numberOfPages: Scalars['Float'];
  title: Scalars['String'];
  type: Type;
  wordsPerPage?: InputMaybe<Scalars['Float']>;
  writingStyle: WritingStyle;
};

type OrderPage = {
  __typename?: 'OrderPage';
  docs?: Maybe<Array<Maybe<Order>>>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPrevPage?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Float']>;
  nextPage?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  pagingCounter?: Maybe<Scalars['Float']>;
  prevPage?: Maybe<Scalars['Float']>;
  totalDocs?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

type OrderResponse = {
  __typename?: 'OrderResponse';
  answer?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  comments?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<User>;
  id?: Maybe<Scalars['ID']>;
  published?: Maybe<Scalars['Boolean']>;
  question?: Maybe<Order>;
  responseType?: Maybe<ResponseType>;
  updatedAt?: Maybe<Scalars['Date']>;
};

type OrderResponseInput = {
  answer?: InputMaybe<Scalars['String']>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  comments?: InputMaybe<Scalars['String']>;
  responseType?: InputMaybe<ResponseType>;
};

type Pagination = {
  currentPage?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
};

type PasswordChangePayload = {
  currentPassword?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
};

type PaymentStatus =
  | 'PAID'
  | 'UN_PAID';

type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']>;
  clientSecret?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
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
  health?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
};


type QueryGetMyOrdersArgs = {
  pagination?: InputMaybe<Pagination>;
};


type QueryGetOrderArgs = {
  orderId: Scalars['String'];
};


type QueryGetOrderResponseArgs = {
  responseId: Scalars['String'];
};


type QueryGetPublicOrdersArgs = {
  filter?: InputMaybe<FilterOrders>;
  pagination?: InputMaybe<Pagination>;
};


type QueryGetUserOrdersArgs = {
  email?: InputMaybe<Scalars['String']>;
};

type RegisterPayload = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
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
  abbr?: Maybe<Scalars['String']>;
  isdst?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  utc?: Maybe<Array<Maybe<Scalars['String']>>>;
  value?: Maybe<Scalars['String']>;
};

type TimezoneInput = {
  abbr?: InputMaybe<Scalars['String']>;
  isdst?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  utc?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  value?: InputMaybe<Scalars['String']>;
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
  aud?: Maybe<Scalars['String']>;
  auth_time?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  email_verified?: Maybe<Scalars['Boolean']>;
  exp?: Maybe<Scalars['Float']>;
  firebase?: Maybe<Firebase>;
  firstName?: Maybe<Scalars['String']>;
  iat?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  iss?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Scalars['String']>>>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  responses?: Maybe<Array<Maybe<Scalars['String']>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  sub?: Maybe<Scalars['String']>;
  timezone?: Maybe<Timezone>;
  uid?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

type UserUpdatePayload = {
  currency?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  language?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  timezone?: InputMaybe<TimezoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

type WritingStyle =
  | 'APA6'
  | 'APA7'
  | 'HARVARD'
  | 'MLA';
