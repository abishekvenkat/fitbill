import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { UnitSelect } from './UnitSelect';
import type { FormData } from '@/lib/types';

interface RunningFormProps {
  onSubmit: (data: FormData) => void;
}

const distanceUnits = [
  { value: 'km', label: 'km' },
  { value: 'mi', label: 'miles' },
];

const paceUnits = [
  { value: 'min/km', label: 'min/km' },
  { value: 'min/mi', label: 'min/mi' },
];

export function RunningForm({ onSubmit }: RunningFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    distance: '',
    calories: '',
    location: '',
    pace: '',
    distanceUnit: 'km',
    paceUnit: 'min/km',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="distance">Distance</Label>
          <div className="flex gap-2">
            <Input
              id="distance"
              required
              type="number"
              step="0.01"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              placeholder="Enter distance"
            />
            <UnitSelect
              value={formData.distanceUnit}
              onValueChange={(value) => setFormData({ ...formData, distanceUnit: value as 'km' | 'mi' })}
              options={distanceUnits}
              placeholder="Unit"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories">Calories Burnt</Label>
          <Input
            id="calories"
            required
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            placeholder="Enter calories burnt"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pace">Average Pace (Optional)</Label>
          <div className="flex gap-2">
            <Input
              id="pace"
              value={formData.pace}
              onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
              placeholder="0:00"
            />
            <UnitSelect
              value={formData.paceUnit}
              onValueChange={(value) => setFormData({ ...formData, paceUnit: value as 'min/km' | 'min/mi' })}
              options={paceUnits}
              placeholder="Unit"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">Generate Receipt</Button>
      </form>
    </Card>
  );
}