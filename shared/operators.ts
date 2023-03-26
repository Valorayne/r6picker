export type Team = typeof ALL_TEAMS[number]
export const ALL_TEAMS = ["attackers", "defenders"] as const

export type AttackerId = typeof ALL_ATTACKER_IDS[number]
export const ALL_ATTACKER_IDS = [
  "sledge", "thatcher", "ash", "thermite", "twitch", "montagne",
  "glaz", "fuze", "blitz", "iq", "buck", "blackbeard", "capitao",
  "hibana", "jackal", "ying", "zofia", "dokkaebi", "lion", "finka",
  "maverick", "nomad", "gridlock", "nokk", "amaru", "kali", "iana",
  "ace", "zero", "flores", "osa", "sens", "grim"
] as const

export type DefenderId = typeof ALL_DEFENDER_IDS[number]
export const ALL_DEFENDER_IDS = [
  "smoke", "mute", "castle", "pulse", "doc", "rook", "kapkan",
  "tachanka", "jager", "bandit", "frost", "valkyrie", "caveira",
  "echo", "mira", "lesion", "ela", "vigil", "maestro", "alibi",
  "clash", "kaid", "mozzie", "warden", "goyo", "wamai", "oryx",
  "melusi", "aruni", "thunderbird", "thorn", "azami", "solis"
] as const

export type OperatorId = AttackerId | DefenderId
export const OPERATOR_IDS_PER_TEAM: Record<Team, readonly OperatorId[]> = {
  attackers: ALL_ATTACKER_IDS,
  defenders: ALL_DEFENDER_IDS
}

export type OperatorDto = {
  id: OperatorId
  name: string
  svg: {
    contents: string
    attributes: Record<string, string>
  }
}