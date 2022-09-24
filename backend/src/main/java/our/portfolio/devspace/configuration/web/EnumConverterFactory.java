package our.portfolio.devspace.configuration.web;

import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import our.portfolio.devspace.exception.CustomException;
import our.portfolio.devspace.exception.ErrorDetail;

@Component
@SuppressWarnings({ "unchecked", "rawtypes" })
public class EnumConverterFactory implements ConverterFactory<String, Enum> {

    @Override
    @NonNull
    public <T extends Enum> Converter<String, T> getConverter(@NonNull Class<T> targetType) {
            return source -> {
                try {
                    return (T) Enum.valueOf(targetType, source.toUpperCase());
                } catch (IllegalArgumentException e) {
                    throw new CustomException(String.format("%s에 %s가 존재하지 않습니다.", targetType.getSimpleName(), source), ErrorDetail.INVALID_INPUT_VALUE);
                }
            };
    }
}
