import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MyStorage } from '../../shared/services/storage';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { profileFeature } from './store/profile-feature';
import { authFeatures } from '../../shared/store/auth-feature';
import { profileActions } from './store/profile-actions';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly store = inject(Store);
  private readonly storage = inject(MyStorage);
  protected readonly profile = toSignal(this.store.select(profileFeature.selectProfile));
  protected readonly loading = toSignal(this.store.select(profileFeature.selectLoading));
  protected readonly userId = toSignal(this.store.select(authFeatures.selectUserId));

  ngOnInit(): void {
    const userId = this.userId() || this.storage.getUserId();
    if (userId) {
      this.store.dispatch(profileActions.load({ userId }));
    }
  }
}
