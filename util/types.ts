export type TeamMember = {
  id: number;
  firstName: string;
  lastName: string;
};

export type Error = {
  message: string;
};

export type User = {
  userId: number;
  username: string;
};

export type Teams = {
  teamId: number;
  teamName: string;
  nbaId: number;
  nbaUrlCode: string;
  conference: string;
  division: string;
  city: string;
};

export type FavoriteTeams = {
  userId: number;
  teamId: number;
};
