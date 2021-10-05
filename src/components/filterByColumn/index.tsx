import React, { useCallback, useState, useRef } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Select from '../select';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Button, Forme } from './styles';

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
  const [blockFilter, setblockFilter] = useState(false);
  const [showClass, setshowClass] = useState<string>();

  const { data } = UsePlanets();

  const { filterPlanetColum } = UseFilterPlanet();

  const { filterColumItensResult } = UseFilterPlanet();
  const { filterColumUsedResult } = UseFilterPlanet();

  const { removeColumItens } = UseFilterPlanet();
  const { addForm } = UseFilterPlanet();
  const { removeForm } = UseFilterPlanet();

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

      await addForm({
        nameForm: formData.colum,
      });

      setshowClass(formData.colum);

      setblockFilter(true);
      removeColumItens(formData.colum);
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, [filterPlanetColum, data, addForm, removeColumItens]);

  const handleRemoveForm = useCallback(() => {
    const dataFrom = formRef.current?.getData();
    if (dataFrom) {
      removeForm(dataFrom);
      setblockFilter(false);
    }
    formRef.current?.reset();
    setshowClass('');
  }, [removeForm]);

  return (
    <Forme ref={formRef} onSubmit={handleSubmite} className={showClass}>
      <Container disabled={blockFilter}>
        <Select name="colum" startValue="">
          <option value="" disabled>Selecione</option>
          {filterColumItensResult && Object.keys(filterColumItensResult).map((propKey: any) => (
            <option
              key={propKey}
              value={filterColumItensResult[propKey].columnValue}
              hidden={filterColumUsedResult.includes(filterColumItensResult[propKey].columnValue)}
            >
              {filterColumItensResult[propKey].columnName}

            </option>
          ))}
        </Select>

        <Select name="comparison" startValue="">
          <option value="" disabled>Selecione</option>
          <option value="morethan">Maior que</option>
          <option value="lessthan">Menor que</option>
          <option value="equalto">Igual a</option>
        </Select>

        <Input type="number" placeholder="digite uma quantidade" name="quantity" />

        <Button type="submit" className="sendForm">Filtrar</Button>
        <Button type="button" className="removeForm" onClick={handleRemoveForm}>Remover</Button>
      </Container>
    </Forme>
  );
};

export default FilterByColumn;
