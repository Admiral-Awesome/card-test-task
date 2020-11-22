import {
  Component,
  OnInit,
  Input,
  OnChanges,
} from '@angular/core';

export interface CardInfo {
  name: string;
  rating: number;
  flags: Array<string>;
  avatar?: string;
  location?: string;
  description?: string;
  reviewsCount?: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: CardInfo = {
    name: 'John Doe',
    rating: 1.2,
    description:
      'UIUX Designer, Web Designer, Mobile App Designer, UIUX Designer, WebDesigner,Mobile App Designer',
    reviewsCount: 1,
    location: 'Lviv, Ukraine',
    flags: [
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
      '/assets/images/ukraine.png',
    ],
  };

  flagsOffset = [];
  constructor() {
    this.setFlagOffsetStyle();
  }
  ngOnChanges() {
    // console.log('12')

  }
  ngOnInit(): void {
    this.setFlagOffsetStyle();
  }

  getStarView(index: number): string {
    if (this.card.rating <= index) {
      return 'star_border';
    }
    if (this.card.rating > index && this.card.rating < index + 1) {
      return 'star_half';
    }
    return 'star';
  }

  // handles 9 flags and less
  setFlagOffsetStyle(): void {
    const CENTRED_TOP = 91;
    const IS_FLAG_COUNT_ODD = this.card.flags.length % 2 === 0 ? 1 : 0;
    const HALF_ARRAY_LENGTH = ~~(this.card.flags.length / 2);
    const DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE = 72;
    const DEGREES_20_TO_RADIAN = 0.35;

    this.flagsOffset = [];

    for ( let i = 0; i <= HALF_ARRAY_LENGTH; i++ ) {
      this.flagsOffset.push({
        // tslint:disable-next-line:max-line-length
        top: CENTRED_TOP - DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE * Math.sin(Math.abs(i - HALF_ARRAY_LENGTH ) * DEGREES_20_TO_RADIAN - DEGREES_20_TO_RADIAN / 2 * IS_FLAG_COUNT_ODD),
        // tslint:disable-next-line:max-line-length
        left: DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE - DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE * Math.cos(Math.abs(HALF_ARRAY_LENGTH - i) * DEGREES_20_TO_RADIAN - DEGREES_20_TO_RADIAN / 2 * IS_FLAG_COUNT_ODD),
      });
    }

    for ( let i = HALF_ARRAY_LENGTH + 1; i < this.card.flags.length; i++ ) {
      this.flagsOffset.push({
        // tslint:disable-next-line:max-line-length
        top: CENTRED_TOP + DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE * Math.sin(Math.abs(i - HALF_ARRAY_LENGTH ) * DEGREES_20_TO_RADIAN + DEGREES_20_TO_RADIAN / 2 * IS_FLAG_COUNT_ODD),
        // tslint:disable-next-line:max-line-length
        left: DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE - DISTANCE_FROM_CENTER_OF_AVATAR_TO_CENTRED_CIRCLE * Math.cos(Math.abs(HALF_ARRAY_LENGTH - i) * DEGREES_20_TO_RADIAN + DEGREES_20_TO_RADIAN / 2 * IS_FLAG_COUNT_ODD),
      });
    }
  }
}
