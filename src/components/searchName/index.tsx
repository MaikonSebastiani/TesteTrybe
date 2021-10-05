import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Button } from './styles';
import { UseFilterPlanet } from '../../context/filterPlanets';
import { UsePlanets } from '../../context/planets';
import Input from '../Input';

interface FilterFormData {
  planetName: string
}

const SearchName: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { filterPlanetName } = UseFilterPlanet();
  const { removeSearchInput } = UseFilterPlanet();

  const { data } = UsePlanets();

  const handleSubmite = useCallback((formData: FilterFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('campo obrigatório'),
      });

      filterPlanetName(formData.planetName, data);
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, [filterPlanetName, data]);

  const handleDelete = useCallback((event) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      removeSearchInput(formRef.current?.getData());
    }
  }, [removeSearchInput]);

  return (
    <Form ref={formRef} onSubmit={handleSubmite}>
      <Container>
        <Input
          type="text"
          name="planetName"
          placeholder="Filtrar planetas por Nome"
          onKeyDown={handleDelete}
        />
        <Button type="submit" className="sendForm">Filtrar</Button>
      </Container>
    </Form>
  );
};

export default SearchName;
