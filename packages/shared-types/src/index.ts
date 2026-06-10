export type RiskTier = 'low' | 'medium' | 'high'

export interface PlayerAnalysis {
	input: string
	riskPercent: number
	riskTier: RiskTier
}
