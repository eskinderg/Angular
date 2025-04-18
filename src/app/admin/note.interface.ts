export interface INote {
    header: string;
    owner: string;
    pinned: boolean;
    active: boolean;
    archived: boolean;
    spellCheck: boolean;
    dateCreated: string;
    dateModified: string;
    dateArchived: string;
}
