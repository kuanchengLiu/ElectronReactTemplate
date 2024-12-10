export interface Router {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (path: string) => void;
}