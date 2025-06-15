
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  onFilterChange: (filters: { 
    category: string; 
    priceRange: [number, number]; 
    searchTerm: string 
  }) => void;
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterUpdate = () => {
    onFilterChange({ category, priceRange, searchTerm });
  };

  const handleClearFilters = () => {
    setCategory('all');
    setPriceRange([0, 2000]);
    setSearchTerm('');
    onFilterChange({ category: 'all', priceRange: [0, 2000], searchTerm: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setTimeout(handleFilterUpdate, 300);
              }}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => {
              setCategory(value);
              setTimeout(handleFilterUpdate, 100);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
            <div className="px-2 py-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value as [number, number]);
                  setTimeout(handleFilterUpdate, 300);
                }}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
