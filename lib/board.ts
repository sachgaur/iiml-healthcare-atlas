export const stages = ['Reach care','Assess & refer','Investigate','Agree & treat','Recover & review'] as const;
export type ContributionKind = 'need' | 'case';
export type Need = {id:string; stage:string; title:string; description:string; created:number; count:number; voted:number; mine:number; source:string|null};
