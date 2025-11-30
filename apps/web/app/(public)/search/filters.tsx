'use client';

import React from 'react';
import { LabeledSelect } from './labeled-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import CountSelect from './count-select';
import { Input } from '@shotly/ui/components/input';
import { useTranslations } from 'next-intl';

function Filters() {
  const t = useTranslations('landing.searchPage.filters');
  const tBudgetRanges = useTranslations('landing.search.budgetRanges');

  const budgetRangesOptions = [
    { label: tBudgetRanges('under1000'), value: '0-1000' },
    { label: tBudgetRanges('1000to3000'), value: '1000-3000' },
    { label: tBudgetRanges('3000to5000'), value: '3000-5000' },
    { label: tBudgetRanges('5000to10000'), value: '5000-10000' },
    { label: tBudgetRanges('10000to20000'), value: '10000-20000' },
    { label: tBudgetRanges('over20000'), value: '20000+' },
  ];
  return (
    <div className="sticky top-0 z-10 p-4 rounded-3xl bg-[linear-gradient(to_right,_#e8ebff_0%,_#fff4ea_100%)] border">
      <div className="mb-4 lg:grid lg:grid-cols-4 lg:gap-4">
        <LabeledSelect
          label={t('category.label')}
          placeholder={t('category.placeholder')}
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">{t('category.any')}</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
        <LabeledSelect
          label={t('location.label')}
          placeholder={t('location.placeholder')}
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">{t('location.any')}</SelectItem>
          <SelectItem value="1">Київ</SelectItem>
          <SelectItem value="2">Львів</SelectItem>
          <SelectItem value="3">Одеса</SelectItem>
          <SelectItem value="4">Харків</SelectItem>
          <SelectItem value="5">Дніпро</SelectItem>
          <SelectItem value="6">Запоріжжя</SelectItem>
          <SelectItem value="7">Івано-Франківськ</SelectItem>
          <SelectItem value="8">Кривий Ріг</SelectItem>
          <SelectItem value="9">Миколаїв</SelectItem>
          <SelectItem value="10">Херсон</SelectItem>
          <SelectItem value="11">Черкаси</SelectItem>
        </LabeledSelect>
        <LabeledSelect
          label={t('price.label')}
          placeholder={t('price.placeholder')}
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">{t('price.any')}</SelectItem>
          {budgetRangesOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </LabeledSelect>
        <LabeledSelect
          label={t('delivery.label')}
          placeholder={t('delivery.placeholder')}
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">{t('delivery.any')}</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
      </div>
      <div className="flex flex-row gap-4 items-start md:items-center">
        <div className="flex flex-wrap gap-2 items-center border-r border-muted pr-6">
          <CountSelect
            label={t('languages.label')}
            values={[]}
            options={[
              { value: 'english', label: 'English' },
              { value: 'spanish', label: 'Spanish' },
              { value: 'french', label: 'French' },
            ]}
          />
          <CountSelect
            label={t('experience.label')}
            values={[]}
            options={[
              { value: '1', label: '1 year' },
              { value: '2', label: '2 years' },
              { value: '3', label: '3 years' },
            ]}
          />
          <CountSelect
            label={t('rating.label')}
            values={[]}
            options={[
              { value: '1', label: '1 star' },
              { value: '2', label: '2 stars' },
              { value: '3', label: '3 stars' },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between items-center flex-1">
          <Select defaultValue="Low to High">
            <SelectTrigger className="border-none shadow-none">
              <span>
                <span className="text-muted-foreground text-xs">
                  {t('sort.label')}
                </span>{' '}
                <SelectValue placeholder={t('sort.placeholder')} />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low to High">
                {t('sort.priceLowToHigh')}
              </SelectItem>
              <SelectItem value="High to Low<">
                {t('sort.priceHighToLow')}
              </SelectItem>
              <SelectItem value="Highest">{t('sort.ratingHighest')}</SelectItem>
              <SelectItem value="Lowest">{t('sort.ratingLowest')}</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="search"
            placeholder={t('searchByName')}
            className="max-w-xs ml-auto shadow-none bg-background"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
