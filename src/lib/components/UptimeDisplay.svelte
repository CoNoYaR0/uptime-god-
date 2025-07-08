<script lang="ts">
  import type { Entity, UptimeMetric, NextSkillRecommendation } from "$lib/types";
  import { getMockSkillName, getMockSkillIcon } from "$lib/mockData"; // Using mock data for now
  import { getSkillIcon } from "$lib/utils"; // Actual utility to get skill icon path

  export let focusedPlayer: Entity | undefined = undefined;

  // Reactive declarations to get the data, fall back to empty if not available
  // The keys for buffUptimes and debuffUptimes will be effect IDs, not skill IDs directly.
  // We'll need a way to map these effect IDs back to skills or display their direct names if available.
  // For now, getMockSkillName will be used, which might not be accurate if skillId is an effect_id.
  $: buffUptimes = focusedPlayer?.damageStats?.buffUptimes ?? {};
  $: debuffUptimes = focusedPlayer?.damageStats?.debuffUptimesOnBoss ?? {};
  $: recommendedSkill = focusedPlayer?.skillStats?.recommendedNextSkill;

  // This function will try to get the skill name from mock data.
  // In a real scenario, you'd have a more robust way to get names for status effect IDs
  // which might involve looking up the buff/debuff definition that includes the source skill.
  function getEffectName(effectId: number): string {
    // For now, we assume effectId might correspond to a skillId that caused it,
    // or it's a buff with a name we can look up. This is a simplification.
    // The SKILL_BUFF_DATA in the backend has names for buff IDs.
    // This information would also need to be available on the frontend.
    return getMockSkillName(effectId); // Placeholder: using skill name getter
  }

  function getEffectIcon(effectId: number): string {
    // Similar to getEffectName, this is a placeholder.
    // We'd need to look up the icon for the specific buff/debuff effect.
    // The SKILL_BUFF_DATA in backend has icons for buffs.
    const rawIconName = getMockSkillIcon(effectId); // Placeholder
    return getSkillIcon(rawIconName);
  }

</script>

{#if focusedPlayer}
  <div class="p-2 bg-neutral-800 rounded-md shadow-lg text-sm">
    <h3 class="text-lg font-semibold mb-2 text-center">{focusedPlayer.name} - Uptime Enhancer</h3>

    {#if recommendedSkill}
      <div class="mb-4 p-2 border border-sky-500 rounded-md bg-neutral-700">
        <h4 class="font-semibold text-sky-400">Next Skill Recommendation:</h4>
        <div class="flex items-center mt-1">
          <img
            src={getSkillIcon(getMockSkillIcon(recommendedSkill.skillId))}
            alt="Skill Icon"
            class="w-8 h-8 mr-2 rounded"
          />
          <div>
            <p class="font-medium">{getMockSkillName(recommendedSkill.skillId)}</p>
            <p class="text-xs text-neutral-400">{recommendedSkill.reason}</p>
          </div>
        </div>
      </div>
    {/if}

    {#if Object.keys(buffUptimes).length > 0}
      <div class="mb-3">
        <h4 class="font-semibold text-green-400 mb-1">Buff Uptimes (on party/self by {focusedPlayer.name}):</h4>
        <ul class="list-disc list-inside pl-1 space-y-1">
          {#each Object.entries(buffUptimes) as [effectId, metric (UptimeMetric)]}
            <li>
              <img src={getEffectIcon(parseInt(effectId))} alt="Buff Icon" class="w-4 h-4 mr-1 inline rounded-sm" />
              <span class="font-medium">{getEffectName(parseInt(effectId))}</span>:
              <span class="text-green-300">{metric.uptimePercentage.toFixed(1)}%</span>
              <span class="text-xs text-neutral-400 ml-1">({(metric.totalActiveTimeMs / 1000).toFixed(1)}s / {(metric.fightDurationMs / 1000).toFixed(1)}s)</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if Object.keys(debuffUptimes).length > 0}
      <div>
        <h4 class="font-semibold text-red-400 mb-1">Boss Debuff Uptimes (by {focusedPlayer.name}):</h4>
        <ul class="list-disc list-inside pl-1 space-y-1">
          {#each Object.entries(debuffUptimes) as [effectId, metric (UptimeMetric)]}
            <li>
              <img src={getEffectIcon(parseInt(effectId))} alt="Debuff Icon" class="w-4 h-4 mr-1 inline rounded-sm" />
              <span class="font-medium">{getEffectName(parseInt(effectId))}</span>:
              <span class="text-red-300">{metric.uptimePercentage.toFixed(1)}%</span>
              <span class="text-xs text-neutral-400 ml-1">({(metric.totalActiveTimeMs / 1000).toFixed(1)}s / {(metric.fightDurationMs / 1000).toFixed(1)}s)</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if Object.keys(buffUptimes).length === 0 && Object.keys(debuffUptimes).length === 0 && !recommendedSkill}
      <p class="text-neutral-400 text-center">No uptime data available for {focusedPlayer.name}.</p>
    {/if}
  </div>
{:else}
  <div class="p-2 text-center text-neutral-500">
    Select a player to see their Uptime Enhancement details.
  </div>
{/if}

<style>
  /* Basic styling, can be expanded */
  li {
    font-size: 0.875rem; /* 14px */
  }
</style>
