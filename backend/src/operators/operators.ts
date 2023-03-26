const ALL_ATTACKER_IDS = [
  "sledge", "thatcher", "ash", "thermite", "twitch", "montagne",
  "glaz", "fuze", "blitz", "iq", "buck", "blackbeard", "capitao",
  "hibana", "jackal", "ying", "zofia", "dokkaebi", "lion", "finka",
  "maverick", "nomad", "gridlock", "nokk", "amaru", "kali", "iana",
  "ace", "zero", "flores", "osa", "sens", "grim"
] as const
type AttackerId = typeof ALL_ATTACKER_IDS[number]

const ALL_DEFENDER_IDS = [
  "smoke", "mute", "castle", "pulse", "doc", "rook", "kapkan",
  "tachanka", "jager", "bandit", "frost", "valkyrie", "caveira",
  "echo", "mira", "lesion", "ela", "vigil", "maestro", "alibi",
  "clash", "kaid", "mozzie", "warden", "goyo", "wamai", "oryx",
  "melusi", "aruni", "thunderbird", "thorn", "azami", "solis"
] as const
type DefenderId = typeof ALL_DEFENDER_IDS[number]

type OperatorId = AttackerId | DefenderId
export const ALL_OPERATOR_IDS: OperatorId[] = [...ALL_ATTACKER_IDS, ...ALL_DEFENDER_IDS]

