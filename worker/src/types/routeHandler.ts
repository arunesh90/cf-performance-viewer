export type routeHandler = (req: Request, event?: FetchEvent) => Response | Promise<Response>
