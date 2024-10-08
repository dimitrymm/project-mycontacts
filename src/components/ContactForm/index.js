import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';

import CategoriesService from '../../services/CategoriesService';

import { useEffect, useState } from 'react';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';

export default function ContactForm({ buttonLabel, onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const { setError, removeError, getErrorMessageByFieldName, errors } =
        useErrors();

    const isFormValid = name && errors.length === 0;

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoriesService.listCategories();
                setCategories(categoriesList);
            } catch {
            } finally {
                setIsLoadingCategories(false);
            }
        }
        loadCategories();
    }, []);

    function handleNameChange(event) {
        setName(event.target.value);
        if (!event.target.value) {
            setError({ field: 'name', message: 'Nome é obrigatório.' });
        } else {
            removeError('name');
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: 'email', message: 'E-Mail Inválido!' });
        } else {
            removeError('email');
        }
    }

    function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({
            name,
            email,
            phone,
            categoryId,
        });
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input
                    error={getErrorMessageByFieldName('name')}
                    placeholder="Nome * "
                    value={name}
                    onChange={handleNameChange}
                />
            </FormGroup>
            <FormGroup error={getErrorMessageByFieldName('email')}>
                <Input
                    type="email"
                    error={getErrorMessageByFieldName('email')}
                    placeholder="E-Mail"
                    value={email}
                    onChange={handleEmailChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                />
            </FormGroup>
            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    disabled={isLoadingCategories}
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                >
                    <option value="">Sem Categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormGroup>
            <ButtonContainer>
                <Button type="submit" disabled={!isFormValid}>
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
