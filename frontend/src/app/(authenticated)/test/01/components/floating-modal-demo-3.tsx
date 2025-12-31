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

/* -----------------------------------------------------------------------------
 * Complex Pattern Demo
 *
 * Pattern Tree:
 * Modal1 (base)
 *   ├── Modal2 (stack)
 *   │     ├── Modal4 (replace) - replaces Modal2
 *   │     └── Modal5 (stack) - stacks next to Modal2
 *   └── Modal3 (stack)
 *         └── Modal6 (replace) - replaces Modal3
 *
 * Test Cases:
 * 1. 1 → 2(stack) → 4(replace): Modal2 gets pushed, Modal4 appears
 * 2. 1 → 2(stack) → 5(stack): Both Modal2 and Modal5 visible
 * 3. 1 → 3(stack) → 6(replace): Modal3 gets pushed, Modal6 appears
 * 4. 1 → 2(stack) → 3(stack): Three modals stacked
 * 5. 1 → 2(stack) → 4(replace) → close4 → 5(stack): Complex flow
 * ---------------------------------------------------------------------------*/

export function ComplexPatternDemo() {
  const [modal1Open, setModal1Open] = React.useState(false);
  const [modal2Open, setModal2Open] = React.useState(false);
  const [modal3Open, setModal3Open] = React.useState(false);
  const [modal4Open, setModal4Open] = React.useState(false);
  const [modal5Open, setModal5Open] = React.useState(false);
  const [modal6Open, setModal6Open] = React.useState(false);

  const closeAll = () => {
    setModal1Open(false);
    setModal2Open(false);
    setModal3Open(false);
    setModal4Open(false);
    setModal5Open(false);
    setModal6Open(false);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold">Complex Pattern Demo</h3>
        <p className="text-sm text-muted-foreground">
          Multiple branching paths with stack and replace combinations
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-lg bg-muted/50 p-4 text-xs">
        <div>
          <strong>Pattern Tree:</strong>
        </div>
        <div className="w-full font-mono text-muted-foreground">
          Modal1 → Modal2(stack) → Modal4(replace) or Modal5(stack)
          <br />
          Modal1 → Modal3(stack) → Modal6(replace)
        </div>
      </div>

      <FloatingModalRoot side="right" align="end">
        {/* ========== Modal 1: Base ========== */}
        <FloatingModal open={modal1Open} onOpenChange={setModal1Open} width="md">
          <FloatingModalTrigger asChild>
            <Button>Open Modal 1</Button>
          </FloatingModalTrigger>
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 1</FloatingModalTitle>
                <Badge variant="outline">Base</Badge>
              </div>
              <FloatingModalDescription>
                This is the base modal. Open Modal 2 or Modal 3.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="mb-2 font-medium">Open child modals:</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setModal2Open(true)}
                      className="justify-start"
                    >
                      → Modal 2 (stack)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setModal3Open(true)}
                      className="justify-start"
                    >
                      → Modal 3 (stack)
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Current State:</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Modal 2: {modal2Open ? '✓ Open' : '✗ Closed'}</li>
                    <li>Modal 3: {modal3Open ? '✓ Open' : '✗ Closed'}</li>
                    <li>Modal 4: {modal4Open ? '✓ Open' : '✗ Closed'}</li>
                    <li>Modal 5: {modal5Open ? '✓ Open' : '✗ Closed'}</li>
                    <li>Modal 6: {modal6Open ? '✓ Open' : '✗ Closed'}</li>
                  </ul>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button variant="destructive" onClick={closeAll} className="w-full">
                Close All
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* ========== Modal 2: Stack from Modal1 ========== */}
        <FloatingModal
          open={modal2Open}
          onOpenChange={setModal2Open}
          mode="stack"
          width="md"
        >
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 2</FloatingModalTitle>
                <Badge>stack</Badge>
              </div>
              <FloatingModalDescription>
                Stacked from Modal 1. Can open Modal 4 or Modal 5.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="mb-2 font-medium">Open from here:</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setModal4Open(true)}
                      className="justify-start"
                    >
                      → Modal 4 (replace) - will push this modal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setModal5Open(true)}
                      className="justify-start"
                    >
                      → Modal 5 (stack) - will stack next to this
                    </Button>
                  </div>
                </div>

                <div className="h-40 rounded-lg bg-blue-100 p-4">
                  <p className="text-blue-800">Modal 2 Content Area</p>
                  <p className="text-sm text-blue-600">
                    This should be partially visible when Modal 4 (replace) opens
                  </p>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant="outline"
                onClick={() => setModal2Open(false)}
                className="w-full"
              >
                Close Modal 2
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* ========== Modal 3: Stack from Modal1 ========== */}
        <FloatingModal
          open={modal3Open}
          onOpenChange={setModal3Open}
          mode="stack"
          width="md"
        >
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 3</FloatingModalTitle>
                <Badge>stack</Badge>
              </div>
              <FloatingModalDescription>
                Stacked from Modal 1. Can open Modal 6.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="mb-2 font-medium">Open from here:</p>
                  <Button
                    variant="outline"
                    onClick={() => setModal6Open(true)}
                    className="w-full justify-start"
                  >
                    → Modal 6 (replace) - will push this modal
                  </Button>
                </div>

                <div className="h-40 rounded-lg bg-green-100 p-4">
                  <p className="text-green-800">Modal 3 Content Area</p>
                  <p className="text-sm text-green-600">
                    This should be partially visible when Modal 6 (replace) opens
                  </p>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant="outline"
                onClick={() => setModal3Open(false)}
                className="w-full"
              >
                Close Modal 3
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* ========== Modal 4: Replace Modal2 ========== */}
        <FloatingModal
          open={modal4Open}
          onOpenChange={setModal4Open}
          mode="replace"
          width="md"
        >
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 4</FloatingModalTitle>
                <Badge variant="destructive">replace</Badge>
              </div>
              <FloatingModalDescription>
                Replaced Modal 2. Modal 2 should show only 80px.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="h-40 rounded-lg bg-red-100 p-4">
                  <p className="text-red-800">Modal 4 Content Area</p>
                  <p className="text-sm text-red-600">
                    This modal replaced Modal 2
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Expected Layout (right to left):</p>
                  <p className="mt-1 font-mono text-muted-foreground">
                    Modal1 | Modal2(80px) | Modal4
                  </p>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant="outline"
                onClick={() => setModal4Open(false)}
                className="w-full"
              >
                Close Modal 4
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* ========== Modal 5: Stack from Modal2 ========== */}
        <FloatingModal
          open={modal5Open}
          onOpenChange={setModal5Open}
          mode="stack"
          width="sm"
        >
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 5</FloatingModalTitle>
                <Badge>stack</Badge>
              </div>
              <FloatingModalDescription>
                Stacked from Modal 2. Both should be fully visible.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="h-40 rounded-lg bg-purple-100 p-4">
                  <p className="text-purple-800">Modal 5 Content</p>
                  <p className="text-sm text-purple-600">Width: sm (320px)</p>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Expected Layout:</p>
                  <p className="mt-1 font-mono text-muted-foreground">
                    Modal1 | Modal2 | Modal5
                  </p>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant="outline"
                onClick={() => setModal5Open(false)}
                className="w-full"
              >
                Close Modal 5
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>

        {/* ========== Modal 6: Replace Modal3 ========== */}
        <FloatingModal
          open={modal6Open}
          onOpenChange={setModal6Open}
          mode="replace"
          width="md"
        >
          <FloatingModalContent height="full">
            <FloatingModalHeader>
              <div className="flex items-center gap-2">
                <FloatingModalTitle>Modal 6</FloatingModalTitle>
                <Badge variant="destructive">replace</Badge>
              </div>
              <FloatingModalDescription>
                Replaced Modal 3. Modal 3 should show only 80px.
              </FloatingModalDescription>
            </FloatingModalHeader>
            <FloatingModalBody>
              <div className="space-y-4">
                <div className="h-40 rounded-lg bg-orange-100 p-4">
                  <p className="text-orange-800">Modal 6 Content Area</p>
                  <p className="text-sm text-orange-600">
                    This modal replaced Modal 3
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Expected Layout:</p>
                  <p className="mt-1 font-mono text-muted-foreground">
                    Modal1 | Modal3(80px) | Modal6
                  </p>
                </div>
              </div>
            </FloatingModalBody>
            <FloatingModalFooter>
              <Button
                variant="outline"
                onClick={() => setModal6Open(false)}
                className="w-full"
              >
                Close Modal 6
              </Button>
            </FloatingModalFooter>
          </FloatingModalContent>
        </FloatingModal>
      </FloatingModalRoot>

      {/* Test Cases */}
      <div className="rounded-lg border p-4">
        <p className="mb-2 font-medium">Test Cases:</p>
        <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          <li>1 → 2(stack): Two modals stacked</li>
          <li>1 → 2(stack) → 4(replace): Modal2 pushed (80px visible)</li>
          <li>1 → 2(stack) → 5(stack): Three modals all visible</li>
          <li>1 → 3(stack): Two modals stacked</li>
          <li>1 → 3(stack) → 6(replace): Modal3 pushed (80px visible)</li>
          <li>1 → 2(stack) → 3(stack): Three modals stacked</li>
          <li>1 → 2 → 3 → 6(replace): Complex chain</li>
        </ol>
      </div>
    </div>
  );
}
