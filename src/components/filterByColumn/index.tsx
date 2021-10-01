import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Select from '../select';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Button } from './styles';

import { UsePlanets } from '../../context/planets';
import { UseFilterPlanet } from '../../context/filterPlanets';
import Input from '../Input';

interface FilterFormData {
    colum: string,
    comparison: string,
    quantity: number
}

const FilterByColumn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { data } = UsePlanets();

  const { filterPlanetColum } = UseFilterPlanet();

  const handleSubmite = useCallback(async (formData: FilterFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        colum: Yup.string().required('campo obrigatório'),
        comparison: Yup.string().required('campo obrigatório'),
        quantity: Yup.number().typeError('utilize apenas numeros').integer().nullable(true)
          .min(0, 'Precisa ser maior ou igual que 0')
          .required('campo obrigatório'),
      });

      // usado para que pegue todos os erros e não somente o primeiro
      await schema.validate(formData, {
        abortEarly: false,
      });

      await filterPlanetColum(
        {
          colum: formData.colum,
          comparison: formData.comparison,
          quantity: formData.quantity,
          dataPlanets: data,
        },
      );
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, [filterPlanetColum, data]);

  return (
    <Form ref={formRef} onSubmit={handleSubmite}>
      <Container>
        <Select name="colum" startValue="">
          <option value="" disabled>Selecione</option>
          <option value="population">População</option>
          <option value="orbital_period">Periodo orbital</option>
          <option value="diameter">Diametro</option>
          <option value="rotation_period">Periodo de rotação</option>
          <option value="surface_water">Superfice da água</option>
        </Select>

        <Select name="comparison" startValue="">
          <option value="" disabled>Selecione</option>
          <option value="morethan">Maior que</option>
          <option value="lessthan">Menor que</option>
          <option value="equalto">Igual a</option>
        </Select>

        <Input name="quantity" />

        <Button type="submit">Filtrar</Button>
      </Container>
    </Form>
  );
};

export default FilterByColumn;
