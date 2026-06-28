export const caseStatusConfig = {
  new: { client: "Przyjęliśmy zgłoszenie", admin: "Nowe" },
  qualification: { client: "Analizujemy sytuację", admin: "Analiza" },
  needs_info: { client: "Czekamy na dodatkowe informacje", admin: "Do uzupełnienia" },
  matching: { client: "Dobieramy rozwiązanie", admin: "Dobór rozwiązania" },
  partner_pending: { client: "Dobieramy rozwiązanie", admin: "Przekazane partnerowi" },
  partner_accepted: { client: "Przygotowujemy kontakt", admin: "Partner zaakceptował" },
  contact_preparation: { client: "Przygotowujemy kontakt", admin: "Przygotowanie kontaktu" },
  meeting_or_offer: { client: "Rozmowy są w toku", admin: "Rozmowa / oferta" },
  decision: { client: "Czekamy na decyzję", admin: "Finalizacja" },
  activated: { client: "Rozwiązanie jest uruchamiane", admin: "Uruchomione" },
  billing: { client: "Domykamy ustalenia", admin: "Do rozliczenia" },
  closed_won: { client: "Zakończone pomyślnie", admin: "Zamknięte: sukces" },
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
