const partnerRequestLabels: Record<string, string> = {
  pending: "Zapoznajemy się z ofertą",
  approved: "Współpraca aktywna",
  rejected: "Wymaga dodatkowej rozmowy"
};

const offerStatusLabels: Record<string, string> = {
  draft: "W przygotowaniu",
  pending_review: "Czeka na sprawdzenie",
  published: "Opublikowana",
  paused: "Wstrzymana"
};

const assignmentStatusLabels: Record<string, string> = {
  pending: "Czeka na odpowiedź",
  accepted: "Przyjęte",
  rejected: "Odrzucone"
};

export function getPartnerRequestLabel(status: string) {
  return partnerRequestLabels[status] ?? "Sprawdzamy informacje";
}

export function getOfferStatusLabel(status: string) {
  return offerStatusLabels[status] ?? "W przygotowaniu";
}

export function getAssignmentStatusLabel(status: string) {
  return assignmentStatusLabels[status] ?? "W trakcie";
}
