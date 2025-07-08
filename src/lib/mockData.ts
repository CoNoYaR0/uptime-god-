import type { SkillData } from '$lib/types';

// This is a mock store for SKILL_DATA.
// In a real implementation, this would be populated by fetching data from the backend.
export const SKILL_DATA: Map<number, SkillData> = new Map([
  [21020, { id: 21020, name: "Sound Shock", icon: "skill_21020", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  [21160, { id: 21160, name: "Heavenly Tune", icon: "skill_21160", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  [21170, { id: 21170, name: "Sonic Vibration", icon: "skill_21170", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  [21110, { id: 21110, name: "Guardian Tune", icon: "skill_21110", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  [21070, { id: 21070, name: "Wind of Music", icon: "skill_21070", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  [21140, { id: 21140, name: "Serenade of Courage", icon: "skill_21140", classId: 0, desc: "", summonIds: null, summonSourceSkill: null, sourceSkill: null }],
  // Add other commonly used skill IDs here if needed for testing
]);

// Mock for ESTHER_DATA if it were needed, similar structure
// export const ESTHER_DATA: Map<number, EstherSkill> = new Map([]);

// Mock for CLASS_MAP if needed
// export const CLASS_MAP: Map<number, string> = new Map([
//   [102, "Bard"], // Example
// ]);

// Helper to get skill name, falling back to ID if not found
export function getMockSkillName(skillId: number): string {
  return SKILL_DATA.get(skillId)?.name ?? `Skill ${skillId}`;
}
export function getMockSkillIcon(skillId: number): string {
  return SKILL_DATA.get(skillId)?.icon ?? `default_skill_icon`;
}
