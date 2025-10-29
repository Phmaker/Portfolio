'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../providers/LanguageProvider'

// CORREÇÃO: Definindo um tipo recursivo para as traduções
// Isso permite objetos aninhados, mas garante que o valor final seja uma string,
// eliminando a necessidade do 'any'.
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

export function useTranslations() {
  const { currentLanguage } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // A dependência `fetchTranslations` foi removida do array de dependências do useEffect
  // para evitar um loop infinito, já que a função é recriada a cada renderização.
  const fetchTranslations = useCallback(async (language: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locales/${language}/common.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(error);
      if (language !== 'pt') {
        // Se falhar, tenta carregar o idioma padrão (português)
        await fetchTranslations('pt');
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // A função não tem dependências externas, então o array fica vazio.

  useEffect(() => {
    fetchTranslations(currentLanguage);
  }, [currentLanguage, fetchTranslations]);

  const t = useCallback((key: string): string => {
    if (isLoading) return '...';

    const keys = key.split('.');
    let result: TranslationValue = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        // CORREÇÃO: Acessando a propriedade de um objeto bem tipado
        result = result[k] as TranslationValue;
      } else {
        return key; // Retorna a chave se a tradução não for encontrada
      }
    }
    
    return typeof result === 'string' ? result : key;
  }, [translations, isLoading]);

  return { t, isLoading, currentLanguage };
}