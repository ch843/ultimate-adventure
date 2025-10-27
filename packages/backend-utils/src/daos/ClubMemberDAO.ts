import { BaseDAO } from "./BaseDAO.js";
import type { Tables } from "@ultimate-adventure/shared-models";

class _ClubMemberDAO extends BaseDAO<"Club Members"> {
  protected tableName = "Club Members" as const;
  protected idColumn = "id" as const;

  public async getClubMember(id: number): Promise<Tables<"Club Members">> {
    return this.getById<Tables<"Club Members">>(id);
  }

  public async getAllClubMembers(): Promise<Tables<"Club Members">[]> {
    return this.getAll<Tables<"Club Members">>();
  }

  public async createClubMember(
    memberData: Omit<Tables<"Club Members">, "id">,
  ): Promise<Tables<"Club Members">> {
    return this.create<Tables<"Club Members">, typeof memberData>(memberData);
  }

  public async updateClubMember(
    id: number,
    updateData: Partial<Tables<"Club Members">>,
  ): Promise<void> {
    return this.update(id, updateData);
  }

  public async deleteClubMember(id: number): Promise<void> {
    return this.delete(id);
  }
}

export const ClubMemberDAO = new _ClubMemberDAO();
