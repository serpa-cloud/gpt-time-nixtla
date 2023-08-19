/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
// @flow
/* eslint-disable react/jsx-props-no-spreading */
// Libs
import * as React from 'react';
import stylex from '@serpa-cloud/stylex';

import Text from './Text';
import Icon from './Icon';
import Flexbox from './Flexbox';
import Cascader, { createNodesFromChildrenFlatten } from './Cascader';

type ValidationInputEvent = 'change' | 'blur';

type Replacer<value> = (value) => string;

type CustomValidation<value> = (value) => boolean;

export type useInputErrors = {
  requiredError?: string | {| +id: string |},
  defaultError?: string | {| +id: string |},
  minlengthError?: string | {| +id: string |},
  maxlengthError?: string | {| +id: string |},
};

export type useInputProps = {|
  autoFocus?: ?boolean,
  placeholder?: string,
  name: string,
  value?: string,
  errors?: useInputErrors,
  type?: string,
  spellCheck?: boolean,
  required?: boolean,
  +regexp?: ?string | ?RegExp,
  autoComplete?: boolean,
  +regexpOverwrite?: ?string | ?RegExp,
  label?: string | {| +id: string |},
  validateEvent?: ValidationInputEvent,
  toLowerCase?: boolean,
  toUpperCase?: boolean,
  +replacer?: ?Replacer<string>,
  +minlength?: ?number,
  +maxlength?: ?number,
  +customValidation?: ?CustomValidation<string>,
  disabled?: boolean,
  validateMinLengthOnBlur?: boolean,
  +maskRegex?: ?string | ?RegExp,
  +maskPermanents?: ?Array<number>,
  maskPermanentChar?: string,
  maskChar?: string,
  icon?: string,
  maskPrefill?: boolean,
  onChange?: ?(e: SyntheticInputEvent<HTMLInputElement>) => void,
  autoCloseSelect?: ?boolean,
  useTransition?: ?boolean,
|};

export type inputRef = {|
  disabled: boolean,
  error: any | string,
  autoCloseSelect: boolean,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  labelText: string,
  spellCheck: boolean,
  type: string,
  value: any | string,
  name: string,
  autoComplete: boolean,
  icon?: string,
  placeholder?: string,
  autoFocus?: ?boolean,
|};

export type useInputRef = {|
  input: inputRef,
  setData: (((any) => any) | any) => void,
  type: string,
  validate: (config?: any) => boolean,
|};

function createErrors(fields: Array<useInputRef>): Array<useInputRef> {
  return fields
    .map((field) => {
      if (field?.input) return field.validate() ? field : null;
      return null;
    })
    .filter(Boolean);
}

function createData(fields: Array<useInputRef>): any {
  if (!fields || !fields.length) return null;

  const result = {};

  fields.forEach((field) => {
    let newValue = field.input.value;
    if (field.type === 'number') newValue = Number(field.input.value);
    if (typeof newValue === 'string') newValue = newValue.trim();

    const propertyPathArr = field.input.name.split('.');

    let reference = result;

    propertyPathArr.forEach((path, index, arr) => {
      const nextValue = arr[index + 1];
      const pathToNumber = Number(path);
      const pathIsNumber = !Number.isNaN(pathToNumber);
      const pathReference = pathIsNumber ? pathToNumber : path;

      if (!nextValue) {
        reference[pathReference] = newValue;
      } else {
        const nextPathToNumber = Number(nextValue);
        const nextPathIsNumber = !Number.isNaN(nextPathToNumber);
        if (nextPathIsNumber) {
          reference[pathReference] = [...(reference[pathReference] || [])];
        } else {
          reference[pathReference] = { ...(reference[pathReference] || {}) };
        }
        reference = reference[pathReference];
      }
    });
  });

  return result;
}

type ValidationResult<TParams> = {
  data: $Exact<TParams>,
  errors: void | Array<useInputRef>,
};

export function validateData<TParams>(fields: Array<useInputRef>): ValidationResult<TParams> {
  const errorsArray = createErrors(fields);
  const data = createData(fields);
  const errors = (errorsArray.length && errorsArray) || undefined;
  return { data, errors };
}

export function useInput({
  // Nombre del campo en el formulario
  name,
  // Valor inicial
  value,
  // Objeto de errores a mostrar incluye required, default y min, ver + abajo
  errors = {},
  // Tipo del input
  type = 'text',
  // Activar o desactivar correciones ortograficas
  spellCheck = false,
  autoComplete = false,
  // Marcar como requerido
  required = false,
  // Expresion para activar errores
  regexp = null,
  // Expresion para remplazar
  regexpOverwrite = null,
  label = '',
  // Evento en cual validar ya sea change o blur
  validateEvent = '',
  // Mandar todo a minuscula
  toLowerCase = false,
  // Mandar todo a mayuscula
  toUpperCase = false,
  /**
   * Funcion para hacer un replace custom ej:
   * (valor) => { return nuevoValor }
   */
  replacer = null,
  minlength = null,
  maxlength = null,
  /**
   * Funcion para hacer un validacion personalizada:
   * (valor) => { return esValido; }
   */
  customValidation = null,
  // Desactivar interaccion en el input
  disabled = false,
  // Forzar validacion de longitud en blur
  validateMinLengthOnBlur = false,
  icon = '',
  placeholder = '',
  onChange = null,
  autoCloseSelect = false,
  useTransition = false,
  autoFocus = false,
}: useInputProps): useInputRef {
  const [data, setData] = React.useState({
    value: value || '',
    displayValue: value || '',
    error: '',
  });

  React.useEffect(() => {
    if (value)
      setData((oldState) => ({
        ...oldState,
        value: value || '',
        displayValue: value || '',
      }));
  }, [value]);

  const {
    requiredError = '',
    defaultError = '',
    minlengthError = '',
    maxlengthError = '',
  } = errors;

  const validate = (config: any = {}) => {
    const { avoidValidation = false } = config;
    let { value: inputValue } = data;
    let error = '';

    if (typeof inputValue === 'string') inputValue = inputValue.trim();

    if (required && !inputValue) error = requiredError;
    else if (minlength && minlength > inputValue.length && !!inputValue.length)
      error = minlengthError;
    else if (regexp && inputValue) {
      if (!new RegExp(regexp).test(inputValue)) error = defaultError;
    }
    if (customValidation) {
      if (!customValidation(inputValue)) error = defaultError;
    }
    if (!avoidValidation) setData((currentState) => ({ ...currentState, error }));
    return !!error;
  };

  const labelText: string = label.toString();

  const input = {
    name,
    disabled,
    autoFocus,
    spellCheck,
    labelText,
    type: type || 'text',
    autoComplete,
    icon,
    placeholder,
    autoCloseSelect: autoCloseSelect || false,
    onChange: (e: SyntheticInputEvent<HTMLInputElement>) => {
      let { value: targetValue } = e.target;
      let error = '';
      if (toLowerCase) targetValue = targetValue.toLowerCase();
      else if (toUpperCase) targetValue = targetValue.toUpperCase();

      if (maxlength && targetValue.length > maxlength) {
        targetValue = targetValue.substring(0, maxlength);
      }

      if (validateEvent === 'change') {
        if (maxlength && targetValue.length > maxlength) {
          error = maxlengthError;
        }
        if (required && !targetValue) error = requiredError;
        else if (regexp && targetValue) {
          if (!new RegExp(regexp).test(targetValue)) error = defaultError;
        }
        if (customValidation) {
          if (!customValidation(targetValue)) error = defaultError;
        }
      }

      if (regexpOverwrite) {
        targetValue = (targetValue.match(new RegExp(regexpOverwrite)) || []).join('');
      }

      const displayValue = targetValue;

      if (replacer) targetValue = replacer(targetValue);

      if (useTransition) {
        React.startTransition(() => {
          setData({ value: targetValue, displayValue, error });
        });
      } else {
        setData({ value: targetValue, displayValue, error });
      }

      if (onChange) onChange(e);
    },
    onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => {
      let { value: targetValue } = e.target;
      let error = '';

      if (validateEvent === 'blur') {
        if (maxlength && targetValue.length > maxlength) {
          targetValue = targetValue.substring(0, maxlength);
          error = maxlengthError;
        }
        if (required && !targetValue) error = requiredError;
        else if (minlength && minlength > targetValue.length) error = minlengthError;
        else if (regexp && targetValue) {
          if (!new RegExp(regexp).test(targetValue)) error = defaultError;
        }
        if (customValidation) {
          if (!customValidation(targetValue)) error = defaultError;
        }
        setData((state) => ({ ...state, value: targetValue, error }));
      } else if (validateMinLengthOnBlur) {
        if (minlength && minlength > targetValue.length) error = minlengthError;
        setData((state) => ({ ...state, value: targetValue, error }));
      }
    },
    value: data.value,
    error: data.error,
  };

  return {
    input,
    setData,
    validate,
    type,
  };
}

type InputType = {
  input: inputRef,
  +children?: ?React$Node,
  +iconComponent?: ?React$Node,
};

const styles = stylex.create({
  label: {
    zIndex: 0,
    height: 56,
    boxSizing: 'border-box',
    cursor: 'text',
    display: 'flex',
    outline: 'none',
    borderRadius: 8,
    position: 'relative',
    backgroundColor: 'var(--neutral-color-100)',
  },
  labelTextArea: {
    height: '100%',
  },
  labelFocus: {
    border: '1px solid var(--primary-color-1)',
  },
  labelBlur: {
    border: '1px solid var(--neutral-color-300)',
  },
  labelError: {
    border: '1px solid var(--red-300)',
  },
  text: {
    left: 16,
    cursor: 'inherit',
    position: 'absolute',
    transitionDuration: 'var(--fds-fast)',
    pointerEvents: 'none',
    transitionProperty: 'transform',
    top: 21,
    transformOrigin: 'top left',
    maxWidth: '100%',
    transitionTimingFunction: 'var(--fds-soft)',
    right: 8,
    display: 'block',
  },
  textOpen: {
    transform: 'scale(.75) translateY(-17px)',
  },
  input: {
    fontSize: '0.875rem',
    fontFamily: 'var(--font-family-apple)',
    paddingTop: 26,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    color: 'var(--neutral-color-800)',
    '-webkit-tap-highlight-color': 'transparent',
    fontWeight: 'normal',
    width: '100%',
    backgroundColor: 'transparent',
    lineHeight: 1.25,
    touchAction: 'manipulation',
    border: 'none',
    outline: 'none',
  },
  modalContainer: {
    '-webkit-tap-highlight-color': 'transparent',
    width: '100%',
    backgroundColor: 'transparent',
    touchAction: 'manipulation',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: 2,
    left: 1,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalInput: {
    paddingTop: 26,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 9,
  },
  customLabelRenderer: {
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalInputContainer: {
    position: 'absolute',
    top: 19,
    right: 19,
  },
  placeholderContainerOverflow: {
    width: '100%',
    overflowX: 'hidden',
    paddingTop: 4,
    paddingBottom: 4,
  },
});

function OptionToLabel({
  value,
  children,
}: {
  value: Array<string>,
  children: React$Node,
}): React$Node {
  const selectedNodes = React.useMemo(() => {
    const nodes = createNodesFromChildrenFlatten(children);
    return value.map((v) => nodes.find((n) => n.value === v) ?? null);
  }, [value, children]);

  if (selectedNodes && selectedNodes.length)
    return (
      <div className={stylex(styles.placeholderContainerOverflow)}>
        <Flexbox alignItems="center" className={stylex(styles.customLabelRenderer)}>
          {selectedNodes.map((n) =>
            n ? <div key={n.value}>{n?.placeholderLabel || n?.label}</div> : null,
          )}
        </Flexbox>
      </div>
    );

  return null;
}

export default function Input({
  children,
  iconComponent,
  input: {
    name,
    error,
    value,
    onBlur,
    onChange,
    labelText,
    autoFocus,
    placeholder,
    type = 'text',
    disabled = false,
    spellCheck = false,
    autoComplete = false,
    autoCloseSelect = false,
  },
}: InputType): React$Node {
  const htmlRef = React.useRef();
  const [focus, setFocus] = React.useState(!!value);

  const [modalOpen, setModalOpen] = React.useState(false);

  const isOpen = focus || !!value;
  const avoidTextToOverlap = type === 'date' || (!!children && !!placeholder);

  React.useEffect(() => {
    if (autoFocus) htmlRef?.current?.focus();
  }, [autoFocus]);

  function handleBlur(e) {
    e.persist();
    setFocus(false);
    onBlur(e);
  }

  const onClose = React.useCallback(() => {
    setModalOpen(false);
    setFocus(false);
    // $FlowIgnore
    if (false) onBlur({ target: { value } });
  }, [onBlur, value]);

  function toggleModal(e) {
    if (modalOpen) {
      e.persist();
      onClose();
    } else {
      // e.stopPropagation();
      setTimeout(() => {
        setModalOpen(true);
        setFocus(true);
      }, 10);
    }
  }

  const handleOnChange = React.useCallback<(Array<string>) => void>(
    (newValue: Array<string>) => {
      // $FlowIgnore
      onChange({ target: { value: newValue?.[0] ?? '' } });
      if (autoCloseSelect) onClose();
    },
    [onChange, autoCloseSelect, onClose],
  );

  function handleFocus() {
    setFocus(true);
  }

  const overrideStyles = {};

  if (disabled) {
    overrideStyles.opacity = '0.4';
    overrideStyles.pointerEvents = 'none';
    overrideStyles.userSelect = 'none';
  }

  if (!!children && modalOpen) {
    overrideStyles.position = 'relative';
    overrideStyles.zIndex = '9';
  }

  return (
    <Flexbox
      flexDirection="column"
      rowGap={8}
      className={stylex(type === 'textarea' && styles.labelTextArea)}
    >
      <label
        htmlFor={name}
        aria-label={labelText}
        style={overrideStyles}
        className={stylex(
          styles.label,
          error ? styles.labelError : isOpen ? styles.labelFocus : styles.labelBlur,
          type === 'textarea' && styles.labelTextArea,
        )}
      >
        <span
          className={stylex(styles.text, avoidTextToOverlap || isOpen ? styles.textOpen : null)}
        >
          <Text type="s1m" color={error ? '--red-300' : isOpen ? '--primary-color-1' : ''}>
            {labelText}
          </Text>
        </span>
        {!!error && type !== 'date' && (
          <div className={stylex(styles.iconContainer)}>
            <Icon icon="error" weight={500} color="--red-300" fill />
          </div>
        )}
        {!!iconComponent && <div className={stylex(styles.iconContainer)}>{iconComponent}</div>}
        {!children && type !== 'textarea' && (
          <input
            id={name}
            dir="auto"
            ref={htmlRef}
            type={type}
            value={value}
            onBlur={handleBlur}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            aria-invalid={!!error}
            aria-label={labelText}
            spellCheck={spellCheck}
            className={stylex(styles.input)}
            autoComplete={autoComplete ? 'on' : 'off'}
          />
        )}
        {!children && type === 'textarea' && (
          <textarea
            id={name}
            dir="auto"
            type={type}
            value={value}
            onBlur={handleBlur}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            aria-invalid={!!error}
            aria-label={labelText}
            spellCheck={spellCheck}
            className={stylex(styles.input)}
            autoComplete={autoComplete ? 'on' : 'off'}
          />
        )}
        {!!children && (
          <div className={stylex(styles.modalInput)}>
            {error ? null : (
              <div className={stylex(styles.modalInputContainer)}>
                <Icon icon="expand_more" size={16} weight={400} color="--neutral-color-600" />
              </div>
            )}
            {value ? <OptionToLabel value={[value]}>{children}</OptionToLabel> : null}
            {!value && placeholder ? (
              <Text type="s0m" color="--neutral-color-800">
                {placeholder}
              </Text>
            ) : null}
            <div className={stylex(styles.modalContainer)} onClick={toggleModal}>
              <Cascader
                open={modalOpen}
                value={[value]}
                onClose={onClose}
                onChange={handleOnChange}
                containerHeight={-1}
              >
                {children}
              </Cascader>
            </div>
          </div>
        )}
      </label>
      {!!error && (
        <Text type="s0r" color="--red-300">
          {error}
        </Text>
      )}
    </Flexbox>
  );
}

Input.defaultProps = {
  children: null,
  iconComponent: null,
};
