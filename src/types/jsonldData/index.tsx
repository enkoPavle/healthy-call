export interface JsonLdData<MemberType> {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": MemberType;
  "hydra:totalItems": number;
  "hydra:view"?: JsonLdView;
  "hydra:search": any;
}

export interface JsonLdView {
  "@id": string;
  "@type": string;
  "hydra:first": string;
  "hydra:last": string;
  "hydra:next": string;
  "hydra:previous": string;
}

export interface TransformedJsonLdData<MemberType> {
  data: MemberType;
  totalItems: number;
  params: Record<string, string | number>;
  view: {
    first: number;
    last: number;
    next: number;
    previous: number;
    current: number;
  };
}
