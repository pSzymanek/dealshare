export const caseStatusConfig = {
  new: { client: "Przyjęliśmy zgłoszenie", admin: "Nowe" },
  qualification: { client: "Analizujemy sytuację", admin: "Analiza" },
  needs_info: { client: "Potrzebujemy uzupełnienia", admin: "Do uzupełnienia" },
  matching: { client: "Dobieramy rozwiązanie", admin: "Dobór rozwiązania" },
  partner_pending: { client: "Dobieramy rozwiązanie", admin: "Przekazane partnerowi" },
  partner_accepted: { client: "Przygotowujemy kontakt", admin: "Partner zaakceptował" },
  contact_preparation: { client: "Przygotowujemy kontakt", admin: "Przygotowanie kontaktu" },
  meeting_or_offer: { client: "Rozmowa / oferta w toku", admin: "Rozmowa / oferta" },
  decision: { client: "Decyzja i finalizacja", admin: "Finalizacja" },
  activated: { client: "Decyzja i finalizacja", admin: "Uruchomione" },
  billing: { client: "Decyzja i finalizacja", admin: "Do rozliczenia" },
  closed_won: { client: "Zamknięte", admin: "Zamknięte: sukces" },
  closed_lost: { client: "Zamknięte", admin: "Zamknięte" }
} as const;

export type CaseStatus = keyof typeof caseStatusConfig;

export const caseStatusOrder = Object.keys(caseStatusConfig) as CaseStatus[];

export function getClientCaseStatus(status: string) {
  return caseStatusConfig[status as CaseStatus]?.client ?? "Analizujemy sytuację";
}

export function getAdminCaseStatus(status: string) {
  return caseStatusConfig[status as CaseStatus]?.admin ?? status;
}
