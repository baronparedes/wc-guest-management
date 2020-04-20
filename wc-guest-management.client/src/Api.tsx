/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from "restful-react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface DashboardMetric {
  slot: "9 AM" | "12 NN" | "3 PM" | "6 PM" | "NA";
  count: number;
  [key: string]: any;
}

export interface DashboardLineItem {
  label: string;
  metrics: DashboardMetric[];
  [key: string]: any;
}

export interface DashboardCategory {
  title: "age" | "activity";
  metrics: DashboardLineItem[];
  [key: string]: any;
}

export interface DashboardReport {
  totalGuests: number;
  summary: DashboardMetric[];
  categories: DashboardCategory[];
  [key: string]: any;
}

export interface Guest {
  _id?: string | null;
  visitDate: string;
  tableNumber: number;
  volunteer: string;
  guest: string;
  age?: number | null;
  birthDate?: string | null;
  mobile?: string | null;
  email?: string | null;
  civilStatus?: string | null;
  cityOfResidence?: string | null;
  cityOfWorkplace?: string | null;
  category?: string | null;
  series?: number | null;
  createdDate?: string | null;
  worshipDay?: string | null;
  worshipTime?: "9 AM" | "12 NN" | "3 PM" | "6 PM" | "NA" | null;
  action?: "A" | "DNA" | "Prayed" | "Counseled" | null;
  gender?: string | null;
  [key: string]: any;
}

export interface InfoSlip {
  visitDate: string;
  worshipTime?: "9 AM" | "12 NN" | "3 PM" | "6 PM" | "NA" | null;
  tableNumber?: number | null;
  volunteer: string;
  guests: string;
  [key: string]: any;
}

export interface Profile {
  _id?: string | null;
  name: string;
  username: string;
  password?: string | null;
  scopes?: string | null;
  [key: string]: any;
}

export interface AuthResult {
  profile: Profile;
  token: string;
  [key: string]: any;
}

export interface GetDashboardReportQueryParams {
  fromDate?: string;
  toDate?: string;
}

export type GetDashboardReportProps = Omit<GetProps<DashboardReport, unknown, GetDashboardReportQueryParams>, "path">;

export const GetDashboardReport = (props: GetDashboardReportProps) => (
  <Get<DashboardReport, unknown, GetDashboardReportQueryParams>
    path={`/api/dashboard`}
    {...props}
  />
);

export type UseGetDashboardReportProps = Omit<UseGetProps<DashboardReport, GetDashboardReportQueryParams>, "path">;

export const useGetDashboardReport = (props: UseGetDashboardReportProps) => useGet<DashboardReport, unknown, GetDashboardReportQueryParams>(`/api/dashboard`, props);


export interface FetchGuestsQueryParams {
  fromDate?: string;
  toDate?: string;
  criteria?: string;
  slot?: "9 AM" | "12 NN" | "3 PM" | "6 PM" | "NA";
}

export type FetchGuestsProps = Omit<GetProps<Guest[], unknown, FetchGuestsQueryParams>, "path">;

export const FetchGuests = (props: FetchGuestsProps) => (
  <Get<Guest[], unknown, FetchGuestsQueryParams>
    path={`/api/guest`}
    {...props}
  />
);

export type UseFetchGuestsProps = Omit<UseGetProps<Guest[], FetchGuestsQueryParams>, "path">;

export const useFetchGuests = (props: UseFetchGuestsProps) => useGet<Guest[], unknown, FetchGuestsQueryParams>(`/api/guest`, props);


export interface UpdateGuestDataRequestBody {
  guestData: Guest;
}

export type UpdateGuestDataProps = Omit<MutateProps<Guest, unknown, void, UpdateGuestDataRequestBody>, "path" | "verb"> & {id: string};

export const UpdateGuestData = ({id, ...props}: UpdateGuestDataProps) => (
  <Mutate<Guest, unknown, void, UpdateGuestDataRequestBody>
    verb="PUT"
    path={`/api/guest/${id}`}
    {...props}
  />
);

export type UseUpdateGuestDataProps = Omit<UseMutateProps<Guest, void, UpdateGuestDataRequestBody>, "path" | "verb"> & {id: string};

export const useUpdateGuestData = ({id, ...props}: UseUpdateGuestDataProps) => useMutate<Guest, unknown, void, UpdateGuestDataRequestBody>("PUT", `/api/guest/${id}`, props);


export interface FetchGuestsByCategoryQueryParams {
  slot?: "9 AM" | "12 NN" | "3 PM" | "6 PM" | "NA";
  index?: string;
  fromDate?: string;
  toDate?: string;
}

export type FetchGuestsByCategoryProps = Omit<GetProps<Guest[], unknown, FetchGuestsByCategoryQueryParams>, "path"> & {category: "age" | "activity"};

export const FetchGuestsByCategory = ({category, ...props}: FetchGuestsByCategoryProps) => (
  <Get<Guest[], unknown, FetchGuestsByCategoryQueryParams>
    path={`/api/guest/category/${category}`}
    {...props}
  />
);

export type UseFetchGuestsByCategoryProps = Omit<UseGetProps<Guest[], FetchGuestsByCategoryQueryParams>, "path"> & {category: "age" | "activity"};

export const useFetchGuestsByCategory = ({category, ...props}: UseFetchGuestsByCategoryProps) => useGet<Guest[], unknown, FetchGuestsByCategoryQueryParams>(`/api/guest/category/${category}`, props);


export interface WelcomeRequestBody {
  infoSlip: InfoSlip;
  print?: boolean;
}

export type WelcomeProps = Omit<MutateProps<Guest[], unknown, void, WelcomeRequestBody>, "path" | "verb">;

export const Welcome = (props: WelcomeProps) => (
  <Mutate<Guest[], unknown, void, WelcomeRequestBody>
    verb="POST"
    path={`/api/guest/welcome`}
    {...props}
  />
);

export type UseWelcomeProps = Omit<UseMutateProps<Guest[], void, WelcomeRequestBody>, "path" | "verb">;

export const useWelcome = (props: UseWelcomeProps) => useMutate<Guest[], unknown, void, WelcomeRequestBody>("POST", `/api/guest/welcome`, props);


export interface AuthRequestBody {
  username: string;
  password: string;
}

export type AuthProps = Omit<MutateProps<AuthResult, unknown, void, AuthRequestBody>, "path" | "verb">;

export const Auth = (props: AuthProps) => (
  <Mutate<AuthResult, unknown, void, AuthRequestBody>
    verb="POST"
    path={`/api/profile/auth`}
    {...props}
  />
);

export type UseAuthProps = Omit<UseMutateProps<AuthResult, void, AuthRequestBody>, "path" | "verb">;

export const useAuth = (props: UseAuthProps) => useMutate<AuthResult, unknown, void, AuthRequestBody>("POST", `/api/profile/auth`, props);


export type MeProps = Omit<GetProps<Profile, unknown, void>, "path">;

export const Me = (props: MeProps) => (
  <Get<Profile, unknown, void>
    path={`/api/profile/me`}
    {...props}
  />
);

export type UseMeProps = Omit<UseGetProps<Profile, void>, "path">;

export const useMe = (props: UseMeProps) => useGet<Profile, unknown, void>(`/api/profile/me`, props);

