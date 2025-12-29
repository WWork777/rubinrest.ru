'use client';
import { useState } from 'react';
import styles from './ContactUs.module.scss';
import Image from 'next/image';

interface FormErrors {
  name?: string;
  phone?: string;
  privacyPolicy?: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
    privacyPolicy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const key = name as keyof FormErrors;
    // Очищаем ошибку при изменении поля
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) return 'Имя обязательно для заполнения';
    if (name.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'Телефон обязателен для заполнения';
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, '')))
      return 'Введите корректный номер телефона';
    return '';
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      privacyPolicy: formData.privacyPolicy
        ? ''
        : 'Необходимо согласие на обработку персональных данных',
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.privacyPolicy;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return value;

    let formatted = '+7 ';
    if (numbers.length > 1) {
      formatted += numbers.substring(1, 4);
    }
    if (numbers.length > 4) {
      formatted += ' ' + numbers.substring(4, 7);
    }
    if (numbers.length > 7) {
      formatted += ' ' + numbers.substring(7, 9);
    }
    if (numbers.length > 9) {
      formatted += ' ' + numbers.substring(9, 11);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Удаляем все нецифровые символы кроме + и пробелов
    value = value.replace(/[^\d+\s]/g, '');

    // Форматируем номер
    const formattedValue = formatPhone(value);
    setFormData((prev) => ({ ...prev, phone: formattedValue }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Отправляем данные через наш API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          comment: formData.comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке');
      }

      setSubmitStatus('success');
      console.log('Заявка успешно отправлена в Telegram:', data);

      // Сбрасываем форму через 2 секунды после успешной отправки
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          comment: '',
          privacyPolicy: false,
        });
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contactus" className={styles.contactUs}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <Image
            src='/svadba/ContactUs/ContactUs_photo_1.jpg'
            alt='Свяжитесь с нами'
            width={800}
            height={1200}
            className={styles.image}
            sizes='50vw'
            priority
            quality={100}
            unoptimized={false}
          />
        </div>
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <h2 className={styles.title}>Свяжитесь с нами</h2>
            <p className={styles.subtitle}>
              Напишите ваш вопрос и мы обязательно на него ответим
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={`${styles.inputGroup} ${styles.requiredField}`}>
                <div className={styles.inputWrapper}>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Имя'
                    className={errors.name ? styles.inputError : ''}
                    disabled={isSubmitting}
                  />
                  {!formData.name && (
                    <span className={styles.requiredStar}>*</span>
                  )}
                </div>
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.requiredField}`}>
                <div className={styles.inputWrapper}>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder='Телефон'
                    className={errors.phone ? styles.inputError : ''}
                    disabled={isSubmitting}
                  />
                  {!formData.phone && (
                    <span className={styles.requiredStar}>*</span>
                  )}
                </div>
                {errors.phone && (
                  <span className={styles.errorText}>{errors.phone}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name='comment'
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder='Комментарий'
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.privacyPolicy}>
                <label className={styles.checkboxLabel}>
                  <input
                    type='checkbox'
                    name='privacyPolicy'
                    checked={formData.privacyPolicy}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxCustom}></span>
                  <span className={styles.checkboxText}>
                    Даю согласие на обработку персональных данных
                  </span>
                </label>
                {errors.privacyPolicy && (
                  <span className={styles.errorText}>
                    {errors.privacyPolicy}
                  </span>
                )}
              </div>

              {/* Статус отправки */}
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  ✅ Заявка успешно отправлена!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  ❌ Ошибка отправки. Попробуйте снова.
                </div>
              )}

              <button
                type='submit'
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'ПЕРЕЗВОНИТЕ МНЕ'}
              </button>
            </form>
            <div className={styles.phoneDecoration}>
              <Image
                src='/svadba/ContactUs/phone.svg'
                alt=''
                width={150}
                height={150}
                className={styles.phoneIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
