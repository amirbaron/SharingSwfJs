'use strict';

/**
 * @ngdoc directive
 * @name angular-uploadcare.directive:UploadCare
 * @description Provides a directive for the Uploadcare widget.
 * # UploadCare
 */
angular.module('ng-uploadcare', [])
  .directive('uploadcareWidget', function () {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<input type="hidden" role="ng-uploadcare-uploader" />',
      scope: {
        onWidgetReady: '&',
        onUploadComplete: '&',
        onChange: '&',
          bindedValue: '='
      },
      controller: ['$scope', '$element', '$log', function($scope, $element, $log) {
        if(!uploadcare) {
          $log.error('Uploadcare script has not been loaded!.');
          return;
        }
        $scope.widget = uploadcare.Widget($element);
        $scope.onWidgetReady({widget: $scope.widget});
        $scope.widget.onUploadComplete(function(info) {
            $scope.bindedValue = info.cdnUrl;
            $scope.$apply();
        });
          $scope.$watch('bindedValue', function(newValue, oldValue) {
              $scope.widget.value(newValue);
          });
        $scope.widget.onChange(function(file) {
            if (!file) {
                $scope.bindedValue = null;
                $scope.apply();
            };
        })
      }]
    };
  });
