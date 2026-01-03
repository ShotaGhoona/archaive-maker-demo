'use client';

import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { MixedModeDemo } from './components/floating-modal-demo';
import { TripleStackModeDemo } from './components/floating-modal-demo-2';
import { ComplexPatternDemo } from './components/floating-modal-demo-3';

export default function TestPage() {
  return (
    <div className='container mx-auto max-w-4xl py-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>FloatingModal</h1>
        <p className='text-muted-foreground'>
          A floating card modal with two display modes: replace and stack.
        </p>
      </div>

      <Separator className='my-8' />

      <section>
        <MixedModeDemo />
      </section>

      <Separator className='my-8' />

      <section>
        <TripleStackModeDemo />
      </section>

      <Separator className='my-8' />

      <section>
        <ComplexPatternDemo />
      </section>
    </div>
  );
}
