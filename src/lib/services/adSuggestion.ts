import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchWebsiteInfo(url: string) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    return {
        title: $('title').text().trim(),
        h1: $('h1').first().text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
    };
}


export function generateNameSuggestions(title: string, h1: string, metaDescription: string): string[] {
    const suggestions: string[] = [];

    
    if (title) {
        suggestions.push(title.substring(0, 30) + (title.length > 30 ? '...' : ''));
    }

    if (h1) {
        suggestions.push(h1.substring(0, 30) + (h1.length > 30 ? '...' : ''));
    }

    if (metaDescription) {
        const words = metaDescription.split(' ').slice(0, 5).join(' ');
        suggestions.push(words + (metaDescription.split(' ').length > 5 ? '...' : ''));
    }

    // Combinar informações
    if (title && h1) {
        suggestions.push(`${title.split(' ').slice(0, 2).join(' ')} - ${h1.split(' ').slice(0, 2).join(' ')}`);
    }

    // Adicionar um prefixo genérico se tiver poucas sugestões
    while (suggestions.length < 4) {
        suggestions.push(`Ad ${suggestions.length + 1}: ${title.split(' ').slice(0, 3).join(' ')}`);
    }

    return suggestions.slice(0, 4); // Retornar no máximo 4 sugestões
}