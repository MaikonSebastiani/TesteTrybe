import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, SelectOption, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    startValue: string
}

const Select: React.FC<SelectProps> = ({
  name, startValue, children, ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const {
    fieldName, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <SelectOption ref={selectRef} defaultValue={startValue}>
        {children}
      </SelectOption>
      {error
      && (
        <Error>{error}</Error>
      )}
    </Container>
  );
};

export default Select;
