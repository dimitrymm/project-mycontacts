/* eslint-disable react/display-name */
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';

import CategoriesService from '../../services/CategoriesService';

import { useEffect, useState, useImperativeHandle } from 'react';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import { forwardRef } from 'react';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmintting, setIsSubmitting] = useState(false);

    useImperativeHandle(ref, () => ({
        setFieldsValues: (contact) => {
            setName(contact.name ?? '');
            setEmail(contact.email ?? '');
            setPhone(formatPhone(contact.phone) ?? '');
            setCategoryId(contact.category_id ?? '');
        },
        resetFields: () => {
            setName('');
            setEmail('');
            setPhone('');
            setCategoryId('');
        },
    }));

    const { setError, removeError, getErrorMessageByFieldName, errors } =
        useErrors();

    const isFormValid = name && errors.length === 0;

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoriesService.listCategories();
                setCategories(categoriesList);
            } catch (error) {
                console.log('erro LoadCategories', error);
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

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        await onSubmit({
            name,
            email,
            phone,
            categoryId,
        });

        setIsSubmitting(false);
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input
                    error={getErrorMessageByFieldName('name')}
                    placeholder="Nome * "
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSubmintting}
                />
            </FormGroup>
            <FormGroup error={getErrorMessageByFieldName('email')}>
                <Input
                    type="email"
                    error={getErrorMessageByFieldName('email')}
                    placeholder="E-Mail"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmintting}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                    disabled={isSubmintting}
                />
            </FormGroup>
            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    disabled={isLoadingCategories || isSubmintting}
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
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    isLoading={isSubmintting}
                >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
});
export default ContactForm;

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
