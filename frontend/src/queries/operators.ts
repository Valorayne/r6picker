import type { OperatorDto, Team } from "shared/operators";
import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import { computed } from "vue";

export function useOperatorsQuery(team: Team) {
  const query = useQuery<OperatorDto[]>(["operators", team],
    () => fetch(`${CONSTANTS.BASE_URL}/operators/${team}`).then(response => response.json()))
  const data = computed(() => query.data.value ?? [])
  return {
    ...query,
    data
  }
}