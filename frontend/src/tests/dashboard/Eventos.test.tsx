import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Eventos from '../../components/dashboard/eventos/Eventos';

//Mock de eventos
vi.mock('../../services/dashboard/dashboardService', () => ({
    default:{
        listarEventos: vi.fn().mockResolvedValue([
            {
                id: 1,
                nome: 'Evento Teste',
                data: '2024-03-01',
                local: 'Local Teste',
                status: 'ativo'
            }
        ]),
        excluirEvento: vi.fn().mockResolvedValue({ success: true })
    }
}));

describe('Eventos', () => {
  it('renderiza a lista de eventos corretamente', async () => {
    render(<Eventos />);
    
    // Verifica se o título está presente
    expect(screen.getByText('Gerenciar Eventos')).toBeInTheDocument();
    
    // Verifica se o botão de adicionar está presente
    expect(screen.getByText('Adicionar Evento')).toBeInTheDocument();
    
    // Verifica se o evento mockado é exibido
    const eventoElement = await screen.findByText('Evento Teste');
    expect(eventoElement).toBeInTheDocument();
  });

  it('abre o diálogo de criação ao clicar no botão adicionar', () => {
    render(<Eventos />);
    
    const addButton = screen.getByText('Adicionar Evento');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Criar Novo Evento')).toBeInTheDocument();
  });

  it('exibe confirmação ao tentar excluir um evento', async () => {
    render(<Eventos />);
    
    // Espera o evento ser carregado
    await screen.findByText('Evento Teste');
    
    // Encontra e clica no botão de excluir
    const deleteButton = screen.getByTestId('delete-event-1');
    fireEvent.click(deleteButton);
    
    // Verifica se o diálogo de confirmação é exibido
    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
  });
}); 