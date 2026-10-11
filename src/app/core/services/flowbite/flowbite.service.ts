import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, PLATFORM_ID, Service } from '@angular/core';

@Service()
export class FlowbiteService {
    private readonly platformId = inject(PLATFORM_ID);

    loadFlowbite(callback: (flowbite: any) => void): void {
        if (isPlatformBrowser(this.platformId)) {
            import('flowbite').then(flowbite => callback(flowbite))
        }
    }
}

