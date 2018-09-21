export interface Options {

    /**
     * Default to true. Whether to offer SSPI Windows authentication
     */
    offerSSPI?: boolean,

    /**
     * Default to true. Whether to offer Basic authentication
     */
    offerBasic?: boolean,

    /**
     * Default to true. Whether authentication performed by NodeSSPI is
     * authoritative. If set to true, then requests passed to downstream
     * are guaranteed to be authenticated because non-authenticated
     * requests will be blocked. If set to false, there is no such
     * guarantee and downstream middleware have the chance to override
     * outputs from NodeSSPI and impose their own rules.
     */
    authoritative?: boolean,

    /**
     * Default to false. Whether authentication should be performed at
     * per request level or per connection level. Per connection level
     * is preferred to reduce overhead.
     */
    perRequestAuth?: boolean,

    /**
     * Default to false for performance sake. Whether to retrieve groups
     * upon successful authentication. See caveats below.
     */
    retrieveGroups?: boolean,

    /**
     * Default to 3. How many login attempts are permitted for this
     * connection.
     */
    maxLoginAttemptsPerConnection?: number,

    /**
     * Default to ['NTLM']. An array of SSPI packages used. To obtain
     * a list of all SSPI packages available on your server, download
     * source code of [mod-auth-sspi](https://code.google.com/p/mod-auth-sspi/source/checkout),
     * then run bin\sspikgs.exe from your
     * server's DOS console.
     */
    sspiPackagesUsed?: string[],

    /**
     * No default value. This is the domain name (a.k.a realm) used by
     * basic authentication if user doesn't prefix their login name with <domain_name>\.
     */
    domain: string // used by basic authentication
}

export interface Connection {

    /**
     * Authenticated user name.
     */
    user?: string;

    /**
     * Authenticated user sid.
     */
    userSid?: string;

    /**
     * If option retrieveGroups is true, group names are populated.
     */
    userGroups?: string[];
}

export interface Request {
    connection: Connection;
}

export interface Response {
    statusCode?: number;

}

export default class main {

    /**
     * 
     * @param opts
     */
    public constructor(opts: Options);

    /**
     * 
     * @param req - Request object, where username, sid and optionally groups
     * will be populated.
     * @param res - Response object.
     * @param cb - Callback for errors
     */
    public authenticate(req: Request, res: Response, cb: (err: any) => any): void;
}