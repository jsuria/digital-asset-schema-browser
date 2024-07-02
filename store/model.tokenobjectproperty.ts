import { TokenObjectComponent } from "./model.tokenobjectcomponent";

export interface TokenObjectProperty{
	title: string,
	description: string,
	Header: TokenObjectComponent,
	Informative: TokenObjectComponent,
	Normative: TokenObjectComponent,
	Metadata: TokenObjectComponent
}