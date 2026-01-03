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
 * Mixed Mode (Full Flow)
 * Bill -> Details (replace) -> Payment (stack)
 * ---------------------------------------------------------------------------*/

export function MixedModeDemo() {
  const [billOpen, setBillOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(false);

  return (
    <div className='space-y-3'>
      <div>
        <h3 className='font-semibold'>Mixed Mode (Full Flow)</h3>
        <p className='text-sm text-muted-foreground'>
          Bill → Details (replace) → Payment (stack). Like the reference images.
        </p>
      </div>

      <FloatingModalRoot side='right' align='end'>
        {/* Level 1: Bill */}
        <FloatingModal open={billOpen} onOpenChange={setBillOpen}>
          <FloatingModalTrigger asChild>
            <Button>Full Flow Demo</Button>
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
              <Button className='w-full' onClick={() => setPaymentOpen(true)}>
                Pay Now
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* Level 2: Details (replace) */}
        <FloatingModal
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          mode='replace'
          onBack={() => setDetailsOpen(false)}
        >
          <FloatingModalContent height='full'>
            <FloatingModalHeader>
              <FloatingModalTitle>Bill Details</FloatingModalTitle>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className='space-y-4 text-sm'>
                <div>
                  <p className='font-medium'>Treatment (2) - $300.00</p>
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

        {/* Level 3: Payment (stack - visible alongside bill) */}
        <FloatingModal
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          mode='stack'
        >
          <FloatingModalContent className='w-[300px]'>
            <FloatingModalHeader>
              <FloatingModalTitle>Cash</FloatingModalTitle>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Total Payment</span>
                  <span className='font-bold'>$435.00</span>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm'>Cash Amount</label>
                  <input
                    type='text'
                    className='w-full rounded border px-3 py-2'
                    placeholder='$0.00'
                  />
                </div>
                <div className='grid grid-cols-4 gap-1'>
                  {['$20', '$30', '$50', '$100'].map((v) => (
                    <Button
                      key={v}
                      variant='outline'
                      size='sm'
                      className='text-xs'
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                className='w-full'
                onClick={() => {
                  setPaymentOpen(false);
                  setBillOpen(false);
                }}
              >
                Pay
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>
      </FloatingModalRoot>
    </div>
  );
}
