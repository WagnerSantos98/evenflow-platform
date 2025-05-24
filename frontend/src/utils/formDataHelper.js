import { formatarData } from "./fomatters";

export function toFormData(data){
    const formData = new FormData();

    if (data.dataNascimento) {
    formData.append('dataNascimento', formatarData(data.dataNascimento));
  }

  if (data.endereco) {
    Object.keys(data.endereco).forEach(key => {
      formData.append(`endereco[${key}]`, data.endereco[key]);
    });
  }

  if (data.foto && data.foto instanceof File) {
    formData.append('foto', data.foto);
  }


  if (data.tipoDocumento) {
    formData.append('tipoDocumento', data.tipoDocumento.toLowerCase());
  }

  Object.keys(data).forEach(key => {
    if (!['foto', 'endereco', 'dataNascimento', 'tipoDocumento'].includes(key) &&
        data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }

    //Eventos
    /*if(data.capa){
      formData.append('capa', data.capa);
    }

    if(data.galeria){
      formData.append('galeria', data.galeria);
    }*/
  });

  return formData;
}