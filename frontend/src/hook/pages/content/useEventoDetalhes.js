import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSnackbar from '../../useSnackbar';
import { MESSAGES } from '../../../utils/alerts/messages';
import dashboardService from '../../../services/dashboard/dashboardService';


const useEventoDetalhes = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useSnackbar();

  useEffect(() => {
    const carregarEvento = async () => {
      try {
        setLoading(true);
        const eventoDetalhado = await dashboardService.eventos.buscarEventoId(id);
        setEvento(eventoDetalhado);
      } catch (error) {
        showError(MESSAGES.EVENTO.ERRO_OBTER, error);
      } finally {
        setLoading(false);
      }
    };

    if (id) carregarEvento();
  }, [id]);

  return {
    evento,
    loading
  };
};

export default useEventoDetalhes;
