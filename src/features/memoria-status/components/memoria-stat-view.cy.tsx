import React, { ReactNode } from 'react';

import { MemoriaStatusView } from './memoria-stat-view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoriaStat } from '@/types/api';

function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('<MemoriaStatusView />', () => {
  it('renders with data for each stat', () => {
    let response: MemoriaStat = {
      attack: ([] = []),
      defense: ([] = []),
      hp: ([] = []),
      magic: ([] = []),
      mental: ([] = []),
      speed: ([] = []),
    };
    Array(30)
      .keys()
      .forEach((i) => {
        response.attack.push({
          level: i + 1,
          value: i * 50,
        });
        response.defense.push({
          level: i + 1,
          value: i * 60,
        });
        response.hp.push({
          level: i + 1,
          value: i * 70,
        });
        response.magic.push({
          level: i + 1,
          value: i * 50,
        });
        response.mental.push({
          level: i + 1,
          value: i * 60,
        });
        response.speed.push({
          level: i + 1,
          value: i * 70,
        });
      });
    cy.intercept('GET', '/api/v1/memorias/1/status', {
      statusCode: 200,
      body: response,
    });
    cy.mount(
      <Wrapper>
        <MemoriaStatusView memoriaId={1} />
      </Wrapper>,
    );
    cy.get('#HP-value').contains((response.hp[response.hp.length - 1].value/ 100).toFixed(2));
    cy.get('#P-ATK-value').contains((response.attack[response.attack.length - 1].value/ 100).toFixed(2));
    cy.get('#M-DEF-value').contains((response.mental[response.mental.length - 1].value/ 100).toFixed(2));
    cy.get('#SPD-value').contains((response.speed[response.speed.length - 1].value/ 100).toFixed(2));
    cy.get('#M-ATK-value').contains((response.magic[response.magic.length - 1].value/ 100).toFixed(2));
    cy.get('#P-DEF-value').contains((response.defense[response.defense.length - 1].value/ 100).toFixed(2));
  });
  it('renders without data', () => {
    cy.mount(
      <Wrapper>
        <MemoriaStatusView memoriaId={1} />
      </Wrapper>,
    );
    cy.contains('NO DATA');
  })
});
