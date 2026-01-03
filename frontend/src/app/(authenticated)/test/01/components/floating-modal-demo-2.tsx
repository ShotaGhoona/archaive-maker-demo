'use client';

import * as React from 'react';
import {
  FloatingModalRoot,
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalFooter,
  FloatingModalTitle,
  FloatingModalDescription,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Separator } from '@/shared/ui/shadcn/ui/separator';

/* -----------------------------------------------------------------------------
 * Triple Stack Mode Demo
 * Bill -> Details (stack) -> Item Details (stack)
 * ---------------------------------------------------------------------------*/

export function TripleStackModeDemo() {
  const [billOpen, setBillOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [itemDetailsOpen, setItemDetailsOpen] = React.useState(false);

  return (
    <div className='space-y-3'>
      <div>
        <h3 className='font-semibold'>Triple Stack Mode</h3>
        <p className='text-sm text-muted-foreground'>
          Bill → Details (stack) → Item Details (stack)
        </p>
      </div>

      <FloatingModalRoot side='right' align='end'>
        {/* Level 1: Bill */}
        <FloatingModal open={billOpen} onOpenChange={setBillOpen}>
          <FloatingModalTrigger asChild>
            <Button>Triple Replace Demo</Button>
          </FloatingModalTrigger>
          <FloatingModalContent height='full'>
            <FloatingModalHeader>
              <div className='flex items-center gap-2'>
                <FloatingModalTitle>Bill #BILL00124</FloatingModalTitle>
                <Badge>UNPAID</Badge>
              </div>
              <FloatingModalDescription>Esther Howard</FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className='space-y-2'>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2'>
                    <span>Treatment (2)</span>
                    <Button
                      variant='link'
                      size='sm'
                      className='h-auto p-0 text-xs'
                      onClick={() => setDetailsOpen(true)}
                    >
                      View Details
                    </Button>
                  </div>
                  <span>$300.00</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span>Component used (1)</span>
                  <span>$120.00</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span>Medicine (1)</span>
                  <span>$15.00</span>
                </div>
                <Separator />
                <div className='flex justify-between py-2 font-bold'>
                  <span>Total</span>
                  <span>$435.00</span>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button className='w-full' variant='outline'>
                Pay Now
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* Level 2: Details (stack) */}
        <FloatingModal
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          mode='stack'
        >
          <FloatingModalContent height='full'>
            <FloatingModalHeader>
              <FloatingModalTitle>Bill Details</FloatingModalTitle>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className='space-y-4 text-sm'>
                <div>
                  <div className='flex items-center justify-between'>
                    <p className='font-medium'>Treatment (2) - $300.00</p>
                    <Button
                      variant='link'
                      size='sm'
                      className='h-auto p-0 text-xs'
                      onClick={() => setItemDetailsOpen(true)}
                    >
                      View Items
                    </Button>
                  </div>
                  <ul className='ml-4 mt-1 space-y-1 text-muted-foreground'>
                    <li>Tooth Filling - $220.00</li>
                    <li>Tooth Cleaning - $80.00</li>
                  </ul>
                </div>
                <div>
                  <p className='font-medium'>Component used (2) - $120.00</p>
                  <ul className='ml-4 mt-1 space-y-1 text-muted-foreground'>
                    <li>Anesthetic (5) - Included</li>
                    <li>Composite Porseline (5) - $120.00</li>
                  </ul>
                </div>
                <div>
                  <p className='font-medium'>Medicine (1) - $15.00</p>
                  <ul className='ml-4 mt-1 space-y-1 text-muted-foreground'>
                    <li>Asam Mefenamat (1) - $15.00</li>
                  </ul>
                </div>
              </div>
            </FloatingModalBody>
          </FloatingModalContent>
        </FloatingModal>

        {/* Level 3: Item Details (stack) */}
        <FloatingModal
          open={itemDetailsOpen}
          onOpenChange={setItemDetailsOpen}
          mode='replace'
        >
          <FloatingModalContent height='full'>
            <FloatingModalHeader>
              <FloatingModalTitle>Treatment Items</FloatingModalTitle>
              <FloatingModalDescription>
                Detailed breakdown of treatments
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className='space-y-4'>
                <div className='rounded-lg border p-4'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-medium'>Tooth Filling</p>
                      <p className='text-sm text-muted-foreground'>
                        Composite resin filling for cavity
                      </p>
                    </div>
                    <span className='font-semibold'>$220.00</span>
                  </div>
                  <Separator className='my-3' />
                  <div className='space-y-1 text-sm text-muted-foreground'>
                    <p>Duration: 45 mins</p>
                    <p>Tooth: #14 (Upper Left First Premolar)</p>
                    <p>Material: Composite Resin</p>
                  </div>
                </div>

                <div className='rounded-lg border p-4'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-medium'>Tooth Cleaning</p>
                      <p className='text-sm text-muted-foreground'>
                        Professional dental cleaning
                      </p>
                    </div>
                    <span className='font-semibold'>$80.00</span>
                  </div>
                  <Separator className='my-3' />
                  <div className='space-y-1 text-sm text-muted-foreground'>
                    <p>Duration: 30 mins</p>
                    <p>Type: Scaling & Polishing</p>
                    <p>Area: Full mouth</p>
                  </div>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setItemDetailsOpen(false)}
              >
                Back to Details
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>
      </FloatingModalRoot>
    </div>
  );
}
